import { Request, Response } from 'express';
import { RefreshTokenUseCase } from '../../application/usecases/RefreshTokenUseCase';
import { TokenService } from '../services/TokenService';

export class RefreshTokenController {
  constructor(
    private refreshTokenUseCase: RefreshTokenUseCase  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const token = req.query.token as string;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    const { user, error } = await TokenService.getInstance().validateToken(token);
  
    if (!user) {
      return res.status(401).json({ message: error });
    }
  
    try {
      const userResponse = await this.refreshTokenUseCase.execute(user);
      return res.json(userResponse);
    } catch (err) {
      console.error('Error refreshing token:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
}
