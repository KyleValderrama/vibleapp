import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Core } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verfication extends Core {
  @Column()
  @Field((type) => String)
  code: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  generateCode(): void {
    this.code = crypto.randomBytes(6).toString('hex');
  }
}
