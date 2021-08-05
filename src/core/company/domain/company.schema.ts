import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  foundationYear: Date;

  @Field()
  businessArea: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateCompanyInput {
  @Field()
  name: string;

  @Field()
  foundationYear: Date;

  @Field()
  businessArea: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class FindCompanyInput {
  @Field()
  id: string;
}
