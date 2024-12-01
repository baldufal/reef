import bcrypt from 'bcryptjs';
import { config } from '../../../config';

export enum Permission {
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  LIGHT = 'LIGHT',
  HEATING = 'HEATING',
}

export type UserUpdate = {
  username: string,
  password: string,
  permissions: Permission[]
}

export class User {
  constructor(
    public username: string,
    public password_hash: string,
    public permissions: Permission[]
  ) {}

  hasPermission(permission: Permission): boolean {
    return this.permissions.includes(permission);
  }

  static fromUserUpdate(userUpdate: UserUpdate): User {
    return new User(userUpdate.username, bcrypt.hashSync(userUpdate.password), userUpdate.permissions);
  }
}

export const defaultUsers: User[] = [
  new User('admin', bcrypt.hashSync(config.admin_password), [Permission.USER_MANAGEMENT, Permission.HEATING, Permission.LIGHT]),
  new User('guest', bcrypt.hashSync(''), [Permission.LIGHT]),
];