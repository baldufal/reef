import { Permission } from './User';
import { UserConfig } from './UserConfig';

// This is the response that the server sends to the web app at various occasions
export type UserResponse = {
  token: string;
  username: string;
  tokenExpiration: number;
  permissions: Permission[];
  userConfig: UserConfig;
};
