import { Request, Response } from 'express';
import { SaveUserConfigUseCase } from '../../application/usecases/SaveUserConfigUseCase';
import { GetUserConfigUseCase } from '../../application/usecases/GetUserConfigUseCase';
import { TokenService } from '../services/TokenService';
import { userManagementLogger } from '../../../logging';

export class UserConfigController {
  constructor(
    private saveUserConfigUseCase: SaveUserConfigUseCase,
    private getUserConfigUseCase: GetUserConfigUseCase  ) {}

  async handleSaveConfig(req: Request, res: Response): Promise<Response> {
    userManagementLogger.http('Received request to safe user configuration');
    try {
      const token = req.query.token as string;
      if (!token) {
        userManagementLogger.info('No token provided');
        return res.status(401).json({ message: 'No token provided' });
      }

      const { user, error } = await TokenService.getInstance().validateToken(token);
      if (!user) {
        userManagementLogger.info('Invalid token:', error);
        return res.status(401).json({ message: error });
      }

      await this.saveUserConfigUseCase.execute(user.username, req.body);
      return res.json({ message: 'Configuration saved successfully' });
    } catch (error) {
      userManagementLogger.error('Error saving configuration:', error);
      if (error instanceof Error && error.message === 'Invalid configuration format') {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async handleGetConfig(req: Request, res: Response): Promise<Response> {
    userManagementLogger.http('Received request to get user configuration');
    try {
      const token = req.query.token as string;
      if (!token) {
        userManagementLogger.info('No token provided');
        return res.status(401).json({ message: 'No token provided' });
      }

      const { user, error } = await TokenService.getInstance().validateToken(token);
      if (!user) {
        userManagementLogger.info('Invalid token:', error);
        return res.status(401).json({ message: error });
      }

      const userConfig = await this.getUserConfigUseCase.execute(user.username);
      return res.json(userConfig);
    } catch (error) {
      userManagementLogger.error('Error fetching configuration:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
