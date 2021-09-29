import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';

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
