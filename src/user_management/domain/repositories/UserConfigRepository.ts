import { UserConfig } from '../entities/UserConfig';

export interface UserConfigRepository {
  getConfig(username: string): Promise<UserConfig>;
  saveConfig(username: string, config: UserConfig): Promise<void>;
}
