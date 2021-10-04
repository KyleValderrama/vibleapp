import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';
import { User } from 'src/user/entities/user.entity';

@InputType()
export class ConnectSpotifyInput {
  @Field((type) => String)
  code: string;

  @Field((type) => String, { defaultValue: 'authorization_code' })
  grantType: string;

  @Field((type) => String)
  redirectUri: string;

  // @Field((type) => User, { nullable: true })
  // user?: User;
}

@ObjectType()
export class ConnectSpotifyResponse extends Response {
  @Field((type) => String)
  spotifyAccessToken?: string;

  @Field((type) => String)
  spotifyRefreshToken?: string;

  @Field((type) => String)
  scope?: string;
}
