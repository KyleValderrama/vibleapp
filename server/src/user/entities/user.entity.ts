import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Core } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends Core {
  @Field((type) => String)
  @Column()
  username: string;

  @Field((type) => String)
  @Column()
  email: string;

  @Field((type) => String)
  @Column()
  password: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  spotifyId?: string;

  @Field((type) => Boolean)
  @Column({ nullable: true, default: true })
  isVerified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(_password: string): Promise<boolean> {
    return await bcrypt.compare(_password, this.password);
  }
}
