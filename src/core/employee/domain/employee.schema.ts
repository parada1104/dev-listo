import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { PositionEnum } from "./position.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Company } from "../../company/domain/company.schema";

export type EmployeeDocument = Employee & Document;

@Schema()
@ObjectType()
export class Employee {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  positionName: PositionEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company" })
  @Field(() => Company)
  company: Company | number;
}

@InputType()
export class CreateEmployeeInput {
  @Field()
  name: string;

  @Field()
  positionName: PositionEnum;

  @Field()
  company: string;
}

@InputType()
export class FindEmployeeInput {
  @Field()
  _id: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
