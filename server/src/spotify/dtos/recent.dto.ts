import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';
import { Track } from '../interfaces/track.interface';

@ArgsType()
export class RecentlyPlayedInput {
  @Field((type) => String)
  token: string;
}

@ObjectType()
export class RecentlyPlayedResponse extends Response {
  @Field((type) => [Track], { nullable: true })
  tracks?: Track[];
}
