export enum Permission {
  LIGHT = 'LIGHT',
  HEATING = 'HEATING',
}

export class User {
  constructor(
    public username: string,
    public password: string,
    public permissions: Permission[]
  ) {}

  hasPermission(permission: Permission): boolean {
    return this.permissions.includes(permission);
  }
}
