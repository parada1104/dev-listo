import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { Configuration } from "./config/config.keys";
import { CompanyModule } from "./core/company/company.module";
import { GraphQLModule } from "@nestjs/graphql";
import { EmployeeModule } from "./core/employee/employee.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    ConfigModule,
    CompanyModule,
    EmployeeModule,
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }

  public static getPort(): string | number {
    return AppModule.port;
  }
}
