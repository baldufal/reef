import winston from "winston";
import { config } from "./config";

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta", // Assign a color for `http`
  }
};

winston.addColors(customLevels.colors);

const transportsArray = (service: string) => [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ level, message, module }) => {
        return `$[${(module as string).substring(0, 6)}] ${level}: ${message}`;
      })
    ),
    level: config.cli_log_level,
  }),
  ...(config.file_logging
    ? [
        new winston.transports.File({
          filename: `${service}.log`,
          level: config.file_log_level,
        }),
      ]
    : []),
];

winston.loggers.add("server", {
  levels: customLevels.levels,
  transports: transportsArray("server"),
  defaultMeta: { module: "server" },
});

export const serverLogger = winston.loggers.get("server");

winston.loggers.add("user_management", {
  levels: customLevels.levels,
  transports: transportsArray("user_management"),
  defaultMeta: { module: "user_management" },
});

export const userManagementLogger = winston.loggers.get("user_management");

winston.loggers.add("thermocontrol", {
  levels: customLevels.levels,
  transports: transportsArray("thermocontrol"),
  defaultMeta: { module: "thermocontrol" },
});

export const tcLogger = winston.loggers.get("thermocontrol");

winston.loggers.add("kaleidoscope", {
  levels: customLevels.levels,
  transports: transportsArray("kaleidoscope"),
  defaultMeta: { module: "kaleidoscope" },
});

export const kalLogger = winston.loggers.get("kaleidoscope");
