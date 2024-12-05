import bcrypt from 'bcryptjs';
import { config } from '../../../config';

export enum Permission {
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  LIGHT = 'LIGHT',
  HEATING = 'HEATING',
}

// Data needed to update or create a user
export type UserUpdate = {
  username: string,
  password?: string,
  permissions?: Permission[]
};

export class User {
  constructor(
    public username: string,
    public password_hash: string,
    public permissions: Permission[]
  ) { }

  hasPermission(permission: Permission): boolean {
    return this.permissions.includes(permission);
  }
}

export const defaultUsers: User[] = [
  new User('admin', bcrypt.hashSync(config.admin_password), [Permission.USER_MANAGEMENT, Permission.HEATING, Permission.LIGHT]),
  new User('guest', bcrypt.hashSync(''), [Permission.LIGHT]),
];

export function isUserUpdate(obj: any): obj is UserUpdate {
    if (typeof obj !== 'object') {
        return false;
    }

    const validPermissions = Object.values(Permission);

    return (
        typeof obj.username === 'string' &&
        (typeof obj.password === 'undefined' || typeof obj.password === 'string') &&
        (typeof obj.permissions === 'undefined' || 
         (Array.isArray(obj.permissions) && obj.permissions.every((permission: Permission) => validPermissions.includes(permission))))
    );
}