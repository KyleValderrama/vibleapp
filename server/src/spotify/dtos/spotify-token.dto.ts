import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';

@InputType()
export class SpotifyTokenInput {
  @Field((type) => String)
  code: string;

  @Field((type) => String, { defaultValue: 'authorization_code' })
  grantType: string;

  @Field((type) => String)
  redirectUri: string;
}

@ObjectType()
export class SpotifyTokenResponse extends Response {
  @Field((type) => String)
  spotifyAccessToken?: string;

  @Field((type) => String)
  spotifyRefreshToken?: string;

  @Field((type) => String)
  scope?: string;
}
