import { Request, Response } from 'express';
import { RefreshTokenUseCase } from '../../application/usecases/RefreshTokenUseCase';
import { TokenService } from '../services/TokenService';
import { userManagementLogger } from '../../../logging';
import { checkRequestPermission } from './checkRequestPermission';

export class RefreshTokenController {
  constructor(
    private refreshTokenUseCase: RefreshTokenUseCase) { }

  async handle(req: Request, res: Response): Promise<Response> {
    userManagementLogger.http('Received request to refresh token');

    const { user, tokenError } = await checkRequestPermission(req);

    if (tokenError) {
      userManagementLogger.info(tokenError);
      return res.status(401).json({ message: tokenError });
    }

    try {
      const userResponse = await this.refreshTokenUseCase.execute(user!);
      return res.json(userResponse);
    } catch (err) {
      userManagementLogger.error('Error refreshing token:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

}
