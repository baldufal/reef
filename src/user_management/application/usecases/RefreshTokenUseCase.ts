import { UserResponse } from '../../domain/entities/UserResponse';
import { CreateUserResponseUseCase } from './CreateUserResponseUseCase';
import { User } from '../../domain/entities/User';

export class RefreshTokenUseCase {
  constructor(private createUserResponseUseCase: CreateUserResponseUseCase) {}

  async execute(user: User): Promise<UserResponse> {
    return await this.createUserResponseUseCase.execute(user);
  }
}
