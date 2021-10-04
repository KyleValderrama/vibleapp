import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';

@ArgsType()
export class MeInput {
  @Field((type) => String)
  accessToken: string;
}

@ObjectType()
export class MeResponse extends Response {
  @Field((type) => String)
  displayName: string;

  @Field((type) => String)
  externalUrl: string;

  @Field((type) => String)
  id: string;

  @Field((type) => String)
  imageUrl: string;
}
