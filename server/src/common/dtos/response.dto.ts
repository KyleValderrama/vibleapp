import { Field, ObjectType } from '@nestjs/graphql';
import { Status } from '../types/status';

@ObjectType()
export class Response {
  @Field()
  status: Status;

  @Field((type) => String)
  message: string;
}
