import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';
import { User } from '../entities/user.entity';

@InputType()
export class RegisterInput extends PickType(User, [
  'email',
  'username',
  'password',
]) {}

@ObjectType()
export class RegisterResponse extends Response {
  @Field((type) => User, { nullable: true })
  user?: User;
}
