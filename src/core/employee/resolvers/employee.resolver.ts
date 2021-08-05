import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { EmployeeService } from "../employee.service";
import { CompanyService } from "../../company/company.service";
import {
  CreateEmployeeInput,
  Employee,
  FindEmployeeInput,
} from "../domain/employee.schema";
import { Company } from "../../company/domain/company.schema";

@Resolver()
export class EmployeeResolver {
  constructor(
    private readonly _employeeService: EmployeeService,
    private readonly _companyService: CompanyService,
  ) {}

  @Query(() => [Employee])
  async employees() {
    return this._employeeService.findAll();
  }

  @Query(() => Employee)
  async employee(@Args("input") { _id }: FindEmployeeInput) {
    return this._employeeService.findById(_id);
  }

  @Mutation(() => Employee)
  async createEmployee(@Args("input") employee: CreateEmployeeInput) {
    return this._employeeService.createEmployee(employee);
  }

  @ResolveField(() => Company)
  async company(@Parent() employee: Employee) {
    return this._companyService.findById(employee.company);
  }
}
