import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginResponse extends Response {
  @Field((type) => String, { nullable: true })
  token?: string;

  @Field((type) => String, { nullable: true })
  refresh?: string;

  @Field((type) => String, { nullable: true })
  spotifyToken?: string;
}
