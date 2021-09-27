import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Response } from 'src/common/dtos/response.dto';
import { Verfication } from '../entities/verification.entity';

@InputType()
export class VerifyInput extends PickType(Verfication, ['code', 'user']) {}

@ObjectType()
export class VerifyResponse extends Response {}
