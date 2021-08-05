import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Employee } from "../../employee/domain/employee.schema";

export type CompanyDocument = Company & Document;

@Schema()
@ObjectType()
export class Company {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field(() => Int)
  foundationYear: number;

  @Prop({ required: true })
  @Field()
  businessArea: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: "Employee" })
  @Field(() => [Employee])
  employees: Employee[];
}

@InputType()
export class CreateCompanyInput {
  @Field()
  name: string;

  @Field(() => Int)
  foundationYear: number;

  @Field()
  businessArea: string;
}

@InputType()
export class FindCompanyInput {
  @Field()
  _id: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
