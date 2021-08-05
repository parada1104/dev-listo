import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { CompanyModule } from './core/company/company.module';
import { GraphQLModule } from '@nestjs/graphql';
import { EmployeeModule } from './core/employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    CompanyModule,
    EmployeeModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(Configuration.ATLAS_URL),
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
