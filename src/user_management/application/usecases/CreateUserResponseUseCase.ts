import { UserResponse } from '../../domain/entities/UserResponse';
import { User } from '../../domain/entities/User';
import { TokenService } from '../../infrastructure/services/TokenService';
import { UserConfigRepository } from '../../domain/repositories/UserConfigRepository';

export class CreateUserResponseUseCase {
  constructor(
    private userConfigRepository: UserConfigRepository
  ) {}

  async execute(user: User): Promise<UserResponse> {
    const { token, expirationTime } = TokenService.getInstance().createToken(user.username);
    const userConfig = await this.userConfigRepository.getConfig(user.username);

    return {
      token,
      username: user.username,
      tokenExpiration: expirationTime,
      permissions: user.permissions,
      userConfig,
    };
  }
}
