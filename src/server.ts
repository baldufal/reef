import http from 'http';
import cors from 'cors';
import express, { Request } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import WebSocket, { WebSocketServer } from 'ws';
import { config } from './config';
import { WebSocketTcAdapter } from './thermocontrol/infrastructure/adapters/WebSocketTcAdapter';
import { CreateUserResponseUseCase } from './user_management/application/usecases/CreateUserResponseUseCase';
import { GetUserConfigUseCase } from './user_management/application/usecases/GetUserConfigUseCase';
import { LoginUseCase } from './user_management/application/usecases/LoginUseCase';
import { RefreshTokenUseCase } from './user_management/application/usecases/RefreshTokenUseCase';
import { SaveUserConfigUseCase } from './user_management/application/usecases/SaveUserConfigUseCase';
import { LoginController } from './user_management/infrastructure/controllers/LoginController';
import { RefreshTokenController } from './user_management/infrastructure/controllers/RefreshTokenController';
import { UserConfigController } from './user_management/infrastructure/controllers/UserConfigController';
import { UserConfigRepositoryImpl } from './user_management/infrastructure/repositories/UserConfigRepositoryImpl';
import { UserRepositoryImpl } from './user_management/infrastructure/repositories/UserRepositoryImpl';
import { TokenService } from './user_management/infrastructure/services/TokenService';
import { TcMessageHandler } from './thermocontrol/application/usecases/TcMessageHandler';
import { TcUpdater } from './thermocontrol/application/usecases/TcUpdater';
import { TcWebSocketImpl } from './thermocontrol/infrastructure/adapters/TcWebSocketImpl';
import { TcRestServiceImpl } from './thermocontrol/infrastructure/adapters/TcRestServiceImpl';
import { KalRestServiceImpl } from './kaleidoscope/infrastructure/adapters/KalRestServiceImpl';
import { KalUpdater } from './kaleidoscope/application/usecases/KalUpdater';
import { KalWebSocketServiceImpl } from './kaleidoscope/infrastructure/adapters/KalWebSocketServiceImpl';
import { KaleidoscopeSet } from './kaleidoscope/application/usecases/KaleidoscopeSet';
import { KalWebSocketAdapter } from './kaleidoscope/infrastructure/adapters/KalWebSocketAdapter';
import { serverLogger } from './logging';
import { GetUsersUseCase } from './user_management/application/usecases/GetUsersUseCase';
import { UpdateUserUseCase } from './user_management/application/usecases/UpdateUserUseCase';
import { UserController } from './user_management/infrastructure/controllers/UserController';
import { DeleteUserUseCase } from './user_management/application/usecases/DeleteUserUseCase';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer });


const userRepository = new UserRepositoryImpl();
const userConfigRepository = new UserConfigRepositoryImpl();
TokenService.initialize(config.jwt_secret, config.token_expiry_seconds, userRepository);

const createUserResponseUseCase = new CreateUserResponseUseCase(userConfigRepository);
const loginUseCase = new LoginUseCase(userRepository, createUserResponseUseCase);
const loginController = new LoginController(loginUseCase);
app.post('/login', (req, res) => loginController.handle(req, res));

const getUsersUseCase = new GetUsersUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const userController = new UserController(
  updateUserUseCase,
  getUsersUseCase,
  deleteUserUseCase
);
app.get('/users', (req, res) => userController.handleGetUsers(req, res));
app.post('/update-user', (req, res) => userController.handleUpdateUser(req, res));
app.post('/delete-user', (req, res) => userController.handleDeleteUser(req, res));


const saveUserConfigUseCase = new SaveUserConfigUseCase(userConfigRepository);
const getUserConfigUseCase = new GetUserConfigUseCase(userConfigRepository);
const userConfigController = new UserConfigController(
  saveUserConfigUseCase,
  getUserConfigUseCase
);
app.post('/userconfig', (req, res) => userConfigController.handleSaveConfig(req, res));
app.get('/userconfig', (req, res) => userConfigController.handleGetConfig(req, res));

const refreshTokenUseCase = new RefreshTokenUseCase(createUserResponseUseCase);
const refreshTokenController = new RefreshTokenController(
  refreshTokenUseCase
);
app.post('/refresh-token', (req, res) => refreshTokenController.handle(req, res));

const tcRestService = new TcRestServiceImpl();
const tcUpdater = new TcUpdater(config.thermocontrol_polling_rate, tcRestService);
const tcWebSocket = new TcWebSocketImpl();
const tcMessageHandler = new TcMessageHandler(tcWebSocket, tcRestService, tcUpdater);
const webSocketTcAdapter = new WebSocketTcAdapter(tcUpdater, tcMessageHandler);

const kalRestService = new KalRestServiceImpl(config.kaleidoscope_url, config.kaleidoscope_mock);
const kalUpdater = new KalUpdater(config.kaleidoscope_polling_rate, kalRestService);
const kalWebSocket = new KalWebSocketServiceImpl();
const kalSet = new KaleidoscopeSet(kalRestService, kalWebSocket, kalUpdater, config.kaleidoscope_mock);
const kalWebSocketAdapter = new KalWebSocketAdapter(kalUpdater, kalSet);

// WebSocket authentication and routing
wss.on('connection', (ws: WebSocket, req: Request) => {
  const url = new URL(req.url as string, `http://${req.headers.host}`);
  const path = url.pathname;
  serverLogger.info(`Incoming connection to path ` + path);

  // Routing based on path
  if (path === '/kaleidoscope') {
    kalWebSocketAdapter.handleConnection(ws);
  } else if (path === '/thermocontrol') {
    webSocketTcAdapter.handleConnection(ws);
  } else {
    ws.close(1008, 'Invalid path');
  }

  ws.on('close', () => {
    serverLogger.info(`Connection closed for path ` + path);
  });
});


// Start the HTTP server
httpServer.listen(config.port, () => {
  serverLogger.info('Server running on port ' + config.port);
});
