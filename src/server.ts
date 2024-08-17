import fs from 'fs';
import https from 'https';
import http from 'http';
import cors from 'cors';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import WebSocket, { WebSocketServer } from 'ws';
import { handleTCUpdatesConnection } from './thermocontrol/thermocontrolUpdates';
import { handleTCSetConnection } from './thermocontrol/thermocontrolSet';
import { handleKalUpdatesConnection } from './kaleidoscope/kaleidoscopeUpdates';
import { handleKaleidoscopeSetConnection } from './kaleidoscope/kaleidoscopeSet';
import { config } from './config';

// Load SSL certificate and key
//const privateKey = fs.readFileSync('./cert/localhost+3-key.pem', 'utf8');
//const certificate = fs.readFileSync('./cert/localhost+3.pem', 'utf8');
//const credentials = { key: privateKey, cert: certificate };

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

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


//const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer });

// User login route
app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    const privileged = username === "admin"
    res.json({ token, username, privileged });
  } else {
    res.status(401).send('Invalid credentials');
  }
});


// WebSocket authentication and routing
wss.on('connection', (ws: WebSocket, req: Request) => {
  const url = new URL(req.url as string, `https://${req.headers.host}`);
  const token = url.searchParams.get('token');
  const path = url.pathname;
  console.log(`Incoming connection to path ` + path);

  if (!token) {
    ws.close(1008, 'Token not provided');
    console.log("Rejecting connection because no token provided");
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      ws.close(1008, 'Invalid token');
      console.log("Rejecting connection because provided token is invalid");
      return;
    }

    // Ensure user is a valid string or object containing user information
    const user = decodedUser as { username: string };

    // Routing based on path
    if (path === '/kaleidoscope/updates') {
      handleKalUpdatesConnection(ws);
    } else if (path === '/kaleidoscope/set' && user.username === "admin") {
      handleKaleidoscopeSetConnection(ws);
    } else if (path === '/thermocontrol/updates') {
      handleTCUpdatesConnection(ws);
    } else if (path === '/thermocontrol/set' && user.username === "admin") {
      handleTCSetConnection(ws);
    } else {
      ws.close(1008, 'Invalid path');
    }

    ws.on('close', () => {
      console.log(`Connection closed for user: ${user.username}`);
    });
  });
});

// Start the HTTP server
httpServer.listen(config.port, () => {
  console.log('Server running on http://localhost:' + config.port);
});
