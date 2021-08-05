import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PositionEnum } from './position.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
@ObjectType()
export class Employee {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  positionName: PositionEnum;
}

@InputType()
export class CreateEmployeeInput {
  @Field()
  name: string;

  @Field()
  positionName: PositionEnum;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
