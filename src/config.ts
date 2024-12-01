import fs from 'fs';
import path from 'path';

interface Config {
    port: number;

    cli_log_level: string;
    file_logging: boolean;
    file_log_level: string;

    token_expiry_seconds: number;
    jwt_secret: string;

    admin_password: string;

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
