import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './resolvers/employee.resolver';

@Module({
  providers: [EmployeeService, EmployeeResolver],
})
export class EmployeeModule {}
