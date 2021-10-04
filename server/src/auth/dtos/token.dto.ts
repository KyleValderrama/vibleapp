import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';
import { User } from 'src/user/entities/user.entity';

@ArgsType()
export class TokenInput {
  @Field((type) => String)
  refreshToken: string;
}

@ObjectType()
export class TokenResponse extends Response {
  @Field((type) => String, { nullable: true })
  token?: string;
}
