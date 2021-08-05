import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CompanyService } from "../company.service";
import { EmployeeService } from "../../employee/employee.service";
import {
  Company,
  CreateCompanyInput,
  FindCompanyInput,
} from "../domain/company.schema";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(
    private readonly _companyService: CompanyService,
    private readonly _employeeService: EmployeeService,
  ) {}

  @Query(() => [Company])
  async companies() {
    return this._companyService.findMany();
  }

  @Query(() => Company)
  async company(@Args("input") { _id }: FindCompanyInput) {
    return this._companyService.findById(_id);
  }

  @Mutation(() => Company)
  async createCompany(@Args("input") company: CreateCompanyInput) {
    return this._companyService.createCompany(company);
  }

  @Mutation(() => Company)
  async deleteCompany(@Args("input") { _id }: FindCompanyInput) {
    await this._employeeService.deleteEmployeesFromCompany(_id);
    return this._companyService.deleteCompany(_id);
  }

  @ResolveField()
  async employees(@Parent() company: Company) {
    return this._employeeService.findByCompanyId(company._id);
  }
}
