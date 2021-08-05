import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Employee } from "../../employee/domain/employee.schema";

export type CompanyDocument = Company & Document;

@Schema()
@ObjectType()
export class Company {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  foundationYear: Date;

  @Prop({ required: true })
  @Field()
  businessArea: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Employee.name })
  @Field(() => [Employee])
  employees: Employee[];
}

@InputType()
export class CreateCompanyInput {
  @Field()
  name: string;

  @Field()
  foundationYear: Date;

  @Field()
  businessArea: string;
}

@InputType()
export class FindCompanyInput {
  @Field()
  id: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
