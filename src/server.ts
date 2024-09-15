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
import { checkToken } from './checkToken';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

type JwtPayload = {
  username: string;
  exp: number;
}

export enum Permission {
  LIGHT = 'LIGHT',
  HEATING = 'HEATING',
}

export type User = {
  username: string;
  password: string;
  permissions: Permission[];
}

type UserConfig = {
  dashboard: string[];
}

type UserResponse = {
  token: string;
  username: string;
  tokenExpiration: number;
  permissions: Permission[];
  userConfig: UserConfig;
}

export const users: Array<User> = [
  {
    username: 'guest',
    password: bcrypt.hashSync(''),
    permissions: [Permission.LIGHT]
  },
  {
    username: 'admin',
    password: bcrypt.hashSync('admin'),
    permissions: [Permission.LIGHT, Permission.HEATING]
  }
];

const JWT_SECRET = config.jwt_secret;
const TOKEN_EXPIRATION_SECONDS = config.token_expiry_seconds;

// Path to store user configurations
const USER_CONFIG_DIR = path.join(__dirname, 'userconfig');
const DEFAULT_CONFIG: UserConfig = { dashboard: [] };

const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer });

const getUserConfig = async (user: User): Promise<UserConfig> => {
  const configPath = path.join(USER_CONFIG_DIR, `${user.username}.json`);

  return new Promise((resolve, reject) => {
    fs.readFile(configPath, 'utf-8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // Config file not found, create one with default structure
          fs.writeFile(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8', (writeErr) => {
            if (writeErr) {
              reject('Error creating default configuration');
            }
            resolve(DEFAULT_CONFIG);
          })
        }
        resolve(DEFAULT_CONFIG);
      }
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);

      } catch (err) {
        resolve(DEFAULT_CONFIG);
      }
    });
  })
}

const createUserResponse = async (user: User): Promise<UserResponse> => {
  const createToken = (username: string): { token: string, expirationTime: number } => {
    const expirationTime = Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS;
    const token = jwt.sign({ username: username, exp: expirationTime } as JwtPayload, JWT_SECRET);
    return { token: token, expirationTime: expirationTime };
  }

  const { token, expirationTime } = createToken(user.username);
  const userConfig = await getUserConfig(user);

  return { token, username: user.username, tokenExpiration: expirationTime, permissions: user.permissions, userConfig }
}

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    res.json(await createUserResponse(user));
  } else {
    res.status(401).send('Invalid credentials');
  }
});


app.post('/refresh-token', async (req: Request, res: Response) => {
  console.log(`Incoming request to refresh token`);

  const { user, error } = await checkToken(req, JWT_SECRET, users)

  if (!user) {
    return res.status(401).json({ message: error });
  }

  // Valid, return a fresh one
  res.json(await createUserResponse(user));
  console.log(`Token refreshed successfully`);
});

app.post('/userconfig', async (req: Request, res: Response) => {
  try {
    const { user, error } = await checkToken(req, JWT_SECRET, users);
    if (!user) {
      return res.status(401).json({ message: error });
    }

    const configPath = path.join(USER_CONFIG_DIR, `${user.username}.json`);
    const newConfig = req.body;

    if (!newConfig || !newConfig.dashboard || !Array.isArray(newConfig.dashboard)) {
      return res.status(400).json({ message: 'Invalid configuration format. "dashboard" should be an array.' });
    }

    if (!fs.existsSync(USER_CONFIG_DIR)) {
      try {
        fs.mkdirSync(USER_CONFIG_DIR, { recursive: true });
      } catch (err) {
        console.error(`Error creating directory: ${err}`);
        return res.status(500).json({ message: 'Error creating configuration directory' });
      }
    }

    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), 'utf-8');
    
    return res.json({ message: 'Configuration saved successfully' });
  } catch (err) {
    console.error(`Error saving configuration: ${err}`);
    return res.status(500).json({ message: 'Error saving configuration' });
  }
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
