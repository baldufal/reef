import { userManagementLogger } from '../../../logging';
import { UserConfig } from '../../domain/entities/UserConfig';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class SaveUserConfigUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string, newConfig: any): Promise<void> {
    if (!UserConfig.validate(newConfig)) {
      userManagementLogger.error('Invalid user configuration format');
    }

    const userConfig = new UserConfig(newConfig.dashboard);
    await this.userRepository.updateUser({username, config: userConfig});
  }
}
