import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Company, CompanyDocument } from "./domain/company.schema";
import { Model } from "mongoose";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly _companyModel: Model<CompanyDocument>,
  ) {}

  async findMany(): Promise<Company[]> {
    return this._companyModel.find().lean();
  }

  async findById(id): Promise<Company> {
    try {
      const company = await this._companyModel.findById(id).lean();
      if (!company) {
        throw new NotFoundException("No company exists with id");
      }
      return company;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async createCompany(company): Promise<Company> {
    return this._companyModel.create(company);
  }

  async deleteCompany(id) {
    try {
      const deletedCompany = await this._companyModel.findByIdAndRemove(id);
      if (!deletedCompany) {
        throw new NotFoundException("No company with the id");
      }
      return deletedCompany;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
