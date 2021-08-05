import { Module } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CompanyResolver } from "./resolvers/company.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Company, CompanySchema } from "./domain/company.schema";
import { Employee, EmployeeSchema } from "../employee/domain/employee.schema";
import { EmployeeService } from "../employee/employee.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [CompanyService, CompanyResolver, EmployeeService],
})
export class CompanyModule {}
