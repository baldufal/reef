export class UserConfig {
  constructor(
    public dashboard: string[],
    public scripts: Script[]
  ) { }

  static validate(config: any): boolean {
    return config
      && Array.isArray(config.dashboard)
      && (config.scripts === undefined ||
        (Array.isArray(config.scripts)
          && config.scripts.every((script: any) => typeof script.id === "string"
            && typeof script.name === "string"
            && typeof script.content === "string")));
  }

  static createDefault(): UserConfig {
    return new UserConfig([], []);
  }
}

type Script = {
  id: string;
  name: string;
  content: string;
}