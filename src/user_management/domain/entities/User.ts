import bcrypt from 'bcryptjs';
import { config } from '../../../config';
import { UserConfig } from './UserConfig';

export enum Permission {
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  LIGHT = 'LIGHT',
  HEATING = 'HEATING',
}

// Data needed to update a user
export type UserUpdate = {
  username: string,
  password?: string,
  permissions?: Permission[],
  config?: UserConfig,
};

// Data needed to create a user
export type UserCreationRequest = {
  username: string,
  password: string,
  permissions?: Permission[],
  config?: UserConfig,
};

export class User {
  constructor(
    public username: string,
    public password_hash: string,
    public permissions: Permission[] = [],
    public config: UserConfig = UserConfig.createDefault(),
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
         (Array.isArray(obj.permissions) && obj.permissions.every((permission: Permission) => validPermissions.includes(permission)))) &&
        (typeof obj.config === 'undefined' || typeof obj.config === 'object')
    );
}

export function isUserCreationRequest(obj: any): obj is UserCreationRequest {
    if (typeof obj !== 'object') {
        return false;
    }

    const validPermissions = Object.values(Permission);

    return (
        typeof obj.username === 'string' &&
        typeof obj.password === 'string' &&
        (typeof obj.permissions === 'undefined' || 
         (Array.isArray(obj.permissions) && obj.permissions.every((permission: Permission) => validPermissions.includes(permission)))) &&
        (typeof obj.config === 'undefined' || typeof obj.config === 'object')
    );
}

export function createUserFromRequest(request: UserCreationRequest): User {
    const password_hash = bcrypt.hashSync(request.password);
    const permissions = request.permissions || [];
    const config = request.config || UserConfig.createDefault();

    return new User(request.username, password_hash, permissions, config);
}