import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './resolvers/company.resolver';

@Module({
  providers: [CompanyService, CompanyResolver],
})
export class CompanyModule {}
