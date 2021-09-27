import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class ProfileInput {
  @Field((type) => String)
  id: string;
}

@ObjectType()
export class ProfileResponse extends Response {
  @Field((type) => User, { nullable: true })
  user?: User;
}
