import { Request, Response } from 'express';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';
import { userManagementLogger } from '../../../logging';

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    userManagementLogger.http('LoginController.handle: Login request received');
    const { username, password } = req.body;

    try {
      const result = await this.loginUseCase.execute(username, password);
      if (!result) {
        userManagementLogger.info('LoginController.handle: Invalid credentials');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.json(result);
    } catch (error) {
      userManagementLogger.error('LoginController.handle: Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
