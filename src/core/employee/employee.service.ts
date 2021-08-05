import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CreateEmployeeInput,
  Employee,
  EmployeeDocument,
} from "./domain/employee.schema";
import { Model } from "mongoose";
import { Company, CompanyDocument } from "../company/domain/company.schema";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly _employeeModel: Model<EmployeeDocument>,
    @InjectModel(Company.name)
    private readonly _companyModel: Model<CompanyDocument>,
  ) {}

  async findAll(): Promise<Employee> {
    return this._employeeModel.find().lean();
  }

  async findById(id): Promise<Employee> {
    try {
      const employee = await this._employeeModel.findById(id).lean();
      if (!employee) {
        throw new NotFoundException("No employee exists with id");
      }
      return employee;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findByCompanyId(companyId): Promise<Employee[]> {
    try {
      const company = await this._companyModel.findById(companyId).lean();
      if (!company) {
        throw new NotFoundException("No company exists with that id");
      }
      return this._employeeModel.find({ company: companyId });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deleteEmployeesFromCompany(companyId) {
    try {
      const company = await this._companyModel.findById(companyId).lean();
      if (!company) {
        throw new NotFoundException("No company with id");
      }
      await this._employeeModel.deleteMany({ company: companyId });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async createEmployee(employee: CreateEmployeeInput): Promise<Employee> {
    try {
      const company = await this._companyModel.findById(employee.company);
      if (!company) {
        throw new BadRequestException("Company does not exist");
      }
      const createdEmployee = await this._employeeModel.create(employee);
      if (company.employees) {
        company.employees = [...company.employees, createdEmployee];
      } else {
        company.employees = [createdEmployee];
      }
      await company.save();

      return createdEmployee;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
