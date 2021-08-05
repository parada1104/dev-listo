import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { Configuration } from "../config/config.keys";
import { ConnectionOptions } from "mongoose";

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(_config: ConfigService) {
      return {
        uri: _config.get(Configuration.ATLAS_URL),
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true,
      } as ConnectionOptions;
    },
  }),
];
