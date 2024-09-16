import fs from 'fs';
import path from 'path';

interface Config {
    port: number;

    token_expiry_seconds: number;
    jwt_secret: string;

    thermocontrol_mock: boolean;
    thermocontrol_polling_rate: number;
    thermocontrol_url: string;
    thermocontrol_key: string;

    thermocontrol_aux_mock: boolean;
    thermocontrol_aux_polling_rate: number;
    thermocontrol_aux_url: string;

    kaleidoscope_mock: boolean;
    kaleidoscope_polling_rate: number;
    kaleidoscope_url: string;
}

const loadConfig = (): Config => {
  const configPath = path.resolve(__dirname, './../config/config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(configData) as Config;
};

export const config = loadConfig();
