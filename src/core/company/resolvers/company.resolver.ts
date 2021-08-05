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

@Resolver()
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

  @ResolveField()
  async employees(@Parent() parent: Company) {
    return this._employeeService.findByCompanyId(parent._id);
  }
}
