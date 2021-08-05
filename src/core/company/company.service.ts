import { Injectable } from "@nestjs/common";
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

  async findById(id: string): Promise<Company> {
    return this._companyModel.findById(id).lean();
  }

  async createCompany(company: Company): Promise<Company> {
    return this._companyModel.create(company);
  }

  async deleteCompany(id: string) {
    const result = await this._companyModel.deleteOne({ id: id });
    return result.deletedCount > 0;
  }
}
