import fs from 'fs';
import path from 'path';

interface Config {
    thermocontrol_polling_rate: number;
    thermocontrol_url: string;
    thermocontrol_key: string;
    kaleidoscope_polling_rate: number;
    kaleidoscope_url: string;
}

const loadConfig = (): Config => {
  const configPath = path.resolve(__dirname, './../config/config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(configData) as Config;
};

export const config = loadConfig();
