import { Module } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeResolver } from "./resolvers/employee.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Company, CompanySchema } from "../company/domain/company.schema";
import { Employee, EmployeeSchema } from "./domain/employee.schema";
import { CompanyService } from "../company/company.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [EmployeeService, EmployeeResolver, CompanyService],
})
export class EmployeeModule {}
