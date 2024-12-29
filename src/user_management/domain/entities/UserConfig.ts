export class UserConfig {
    constructor(public dashboard: string[]) {}
  
    static validate(config: any): boolean {
      return config && Array.isArray(config.dashboard);
    }
  
    static createDefault(): UserConfig {
      return new UserConfig([]);
    }
  }