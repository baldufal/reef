import { UserResponse } from '../../domain/entities/UserResponse';
import { User } from '../../domain/entities/User';
import { TokenService } from '../../infrastructure/services/TokenService';
import { userManagementLogger } from '../../../logging';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class CreateUserResponseUseCase {
  constructor(
    private userRepository: UserRepository
  ) {}

  async execute(user: User): Promise<UserResponse> {
    const { token, expirationTime } = TokenService.getInstance().createToken(user.username);
    const userConfig = (await this.userRepository.findByUsername(user.username))?.config;

    if(!userConfig) {
      userManagementLogger.error(`No config found for user ${user.username}, creating default`);
    }

    return {
      token,
      username: user.username,
      tokenExpiration: expirationTime,
      permissions: user.permissions,
      userConfig: userConfig ? userConfig : { dashboard: [] },
    };
  }
}
