import http from 'http';
import cors from 'cors';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import WebSocket, { WebSocketServer } from 'ws';
import { handleTCUpdatesConnection } from './thermocontrol/thermocontrolUpdates';
import { handleTCSetConnection } from './thermocontrol/thermocontrolSet';
import { handleKalUpdatesConnection } from './kaleidoscope/kaleidoscopeUpdates';
import { handleKaleidoscopeSetConnection } from './kaleidoscope/kaleidoscopeSet';
import { config } from './config';

const TOKEN_EXPIRATION_SECONDS = config.token_expiry_seconds;

interface JwtPayload {
  username: string;
  role: string;
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

const users: Array<{ username: string, password: string }> = [
  {
    username: 'guest',
    password: bcrypt.hashSync('')
  },
  {
    username: 'admin',
    password: bcrypt.hashSync('admin')
  }
];

// JWT secret key
const JWT_SECRET = 'supergeheim';

const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer });

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const expirationTime = Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS;
    const token = jwt.sign({ username: user.username, exp: expirationTime }, JWT_SECRET);
    const privileged = username === "admin"

    // Set JWT as HttpOnly Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: TOKEN_EXPIRATION_SECONDS * 1000,
    });

    res.json({ username, privileged, tokenExpiration: expirationTime });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/refresh-token', (req: Request, res: Response) => {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies['token'];

  console.log(`Incoming request to refresh token`);

  if (!token) {
    console.log(`Token not refreshed because: No token provided`);
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(`Token not refreshed because: Token invalid`);
      return res.status(401).json({ message: 'Token expired or invalid' });
    }

    const payload = decoded as JwtPayload;

    // Token ist gültig, stelle ein neues Token aus
    const expirationTime = Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS;
    const newToken = jwt.sign({ username: payload.username, exp: expirationTime }, JWT_SECRET);
    res.cookie('token', newToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: TOKEN_EXPIRATION_SECONDS * 1000,
    });

    console.log(`Token refreshed successfully`);
    res.json({  tokenExpiration: expirationTime });
  });
});


app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });
  res.json({ message: 'Logout successful' });
});


// WebSocket authentication and routing
wss.on('connection', (ws: WebSocket, req: Request) => {
  const url = new URL(req.url as string, `http://${req.headers.host}`);
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies['token'];
  const path = url.pathname;
  console.log(`Incoming connection to path ` + path);

  if (!token) {
    ws.close(1008, 'Token not provided');
    console.log("Rejecting connection because no token provided");
    return;
  }

  jwt.verify(token as string, JWT_SECRET, (err, decoded) => {
    if (err || !decoded) {
      ws.close(1008, 'Invalid token');
      return;
    }

    const payload = decoded as JwtPayload;

    // Routing based on path
    if (path === '/kaleidoscope/updates') {
      handleKalUpdatesConnection(ws);
    } else if (path === '/kaleidoscope/set' && payload.username === "admin") {
      handleKaleidoscopeSetConnection(ws);
    } else if (path === '/thermocontrol/updates') {
      handleTCUpdatesConnection(ws);
    } else if (path === '/thermocontrol/set' && payload.username === "admin") {
      handleTCSetConnection(ws);
    } else {
      ws.close(1008, 'Invalid path');
    }

    ws.on('close', () => {
      console.log(`Connection closed for user: ${payload.username}`);
    });
  });
});

// Start the HTTP server
httpServer.listen(config.port, () => {
  console.log('Server running on port ' + config.port);
});
