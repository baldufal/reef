import { Request, Response } from 'express';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    try {
      const result = await this.loginUseCase.execute(username, password);
      if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.json(result);
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
