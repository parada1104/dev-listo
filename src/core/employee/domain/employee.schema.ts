import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PositionEnum } from './position.enum';

@ObjectType()
export class Employee {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  positionName: PositionEnum;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateEmployeeInput {
  @Field()
  name: string;

  @Field()
  positionName: PositionEnum;
}
