import { userManagementLogger } from '../../../logging';
import { User } from '../../domain/entities/User';
import { UserConfig } from '../../domain/entities/UserConfig';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class SaveUserConfigUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string, newConfig: any): Promise<void> {
    if (!UserConfig.validate(newConfig)) {
      userManagementLogger.error('Invalid user configuration format');
    }

    const userConfig = new UserConfig(newConfig.dashboard, newConfig.scripts || UserConfig.createDefault().scripts);
    await this.userRepository.updateUser({username, config: userConfig});
  }
}
