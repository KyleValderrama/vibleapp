import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';

@InputType()
export class TokenInput {
  @Field((type) => String)
  refreshToken: string;

  @Field((type) => String, { defaultValue: 'refresh_token' })
  grantType: string;
}

@ObjectType()
export class SpotifyTokenResponse extends Response {
  @Field((type) => String, { nullable: true })
  accessToken?: string;
}
