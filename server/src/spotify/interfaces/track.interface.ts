import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  photo: string;

  @Field((type) => String)
  preview: string;

  @Field((type) => String)
  album: string;

  @Field((type) => String)
  artist: string;

  @Field((type) => String)
  url: string;
}
