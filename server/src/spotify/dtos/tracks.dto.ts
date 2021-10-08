import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class TracksInput {
  @Field((type) => String)
  token: string;

  @Field((type) => [String])
  ids: string[];
}
