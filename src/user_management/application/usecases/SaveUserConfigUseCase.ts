import { UserConfig } from '../../domain/entities/UserConfig';
import { UserConfigRepository } from '../../domain/repositories/UserConfigRepository';
import { User } from '../../domain/entities/User';

export class SaveUserConfigUseCase {
  constructor(private userConfigRepository: UserConfigRepository) {}

  async execute(username: string, newConfig: any): Promise<void> {
    if (!UserConfig.validate(newConfig)) {
      throw new Error('Invalid configuration format');
    }

    const userConfig = new UserConfig(newConfig.dashboard);
    await this.userConfigRepository.saveConfig(username, userConfig);
  }
}
