import { UserConfig } from '../../domain/entities/UserConfig';
import { UserConfigRepository } from '../../domain/repositories/UserConfigRepository';

export class GetUserConfigUseCase {
  constructor(private userConfigRepository: UserConfigRepository) {}

  async execute(username: string): Promise<UserConfig> {
    return await this.userConfigRepository.getConfig(username);
  }
}
