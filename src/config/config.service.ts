import * as fs from "fs";
import { parse } from "dotenv";
import { Configuration } from "./config.keys";

export interface IEnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly _envConfig: IEnvConfig;

  constructor() {
    const isDev: boolean = process.env.NODE_ENV !== "production";
    if (isDev) {
      const envFilePath: string = __dirname + "/../../.env";
      const existsPath: boolean = fs.existsSync(envFilePath);
      if (!existsPath) {
        console.log(".Env is not present");
        process.exit(0);
      }
      this._envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this._envConfig = {
        PORT: process.env[Configuration.PORT],
        ATLAS_URL: process.env[Configuration.ATLAS_URL],
      };
    }
  }

  public get(key: string): string {
    return this._envConfig[key];
  }
}
