import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Employee, EmployeeDocument } from "./domain/employee.schema";
import { Model } from "mongoose";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly _employeeModel: Model<EmployeeDocument>,
  ) {}

  async findAll(): Promise<Employee> {
    return this._employeeModel.find().lean();
  }

  async findById(id: string): Promise<Employee> {
    return this._employeeModel.findById(id).lean();
  }

  async findByCompanyId(companyId: string): Promise<Employee[]> {
    return this._employeeModel.find({ where: { company: companyId } });
  }
}
