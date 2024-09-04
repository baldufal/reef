import http from 'http';
import cors from 'cors';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import WebSocket, { WebSocketServer } from 'ws';
import { config } from './config';
import { handleKaleidoscopeConnection } from './kaleidoscope/handleKaleidoscope';
import { handleThermocontrolConnection } from './thermocontrol/handleThermocontrol';

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

const JWT_SECRET = config.jwt_secret;

const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer });

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const expirationTime = Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS;
    const token = jwt.sign({ username: user.username, exp: expirationTime }, JWT_SECRET);
    const privileged = username === "admin"


    res.json({token, username, privileged, tokenExpiration: expirationTime });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/refresh-token', (req: Request, res: Response) => {
  const url = new URL(req.url as string, `http://${req.headers.host}`);
  const token = url.searchParams.get('token');

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

    // Valid, return a fresh one
    const expirationTime = Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS;
    const newToken = jwt.sign({ username: payload.username, exp: expirationTime }, JWT_SECRET);

    console.log(`Token refreshed successfully`);
    res.json({ token: newToken, tokenExpiration: expirationTime });
  });
});


// WebSocket authentication and routing
wss.on('connection', (ws: WebSocket, req: Request) => {
  const url = new URL(req.url as string, `http://${req.headers.host}`);
  const path = url.pathname;
  console.log(`Incoming connection to path ` + path);

    // Routing based on path
    if (path === '/kaleidoscope') {
      handleKaleidoscopeConnection(ws);
    } else if (path === '/thermocontrol') {
      handleThermocontrolConnection(ws);
    } else {
      ws.close(1008, 'Invalid path');
    }

    ws.on('close', () => {
      console.log(`Connection closed for path ` + path);
    });
  });


// Start the HTTP server
httpServer.listen(config.port, () => {
  console.log('Server running on port ' + config.port);
});
