import fs from 'fs';
import path from 'path';
import { UserConfigRepository } from '../../domain/repositories/UserConfigRepository';
import { UserConfig } from '../../domain/entities/UserConfig';

const USER_CONFIG_DIR = path.join(__dirname, 'userconfig');

export class UserConfigRepositoryImpl implements UserConfigRepository {

  constructor() {
    if (!fs.existsSync(USER_CONFIG_DIR)) {
      fs.mkdirSync(USER_CONFIG_DIR, { recursive: true });
    }
  }

  async getConfig(username: string): Promise<UserConfig> {
    const configPath = path.join(USER_CONFIG_DIR, `${username}.json`);
    if (!fs.existsSync(configPath)) {
      return UserConfig.createDefault();
    }

    const data = await fs.promises.readFile(configPath, 'utf-8');
    try {
      const parsedData = JSON.parse(data);
      if (UserConfig.validate(parsedData)) {
        return new UserConfig(parsedData.dashboard);
      }
      return UserConfig.createDefault();
    } catch {
      return UserConfig.createDefault();
    }
  }

  async saveConfig(username: string, config: UserConfig): Promise<void> {
    const configPath = path.join(USER_CONFIG_DIR, `${username}.json`);
    await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
  }
}
