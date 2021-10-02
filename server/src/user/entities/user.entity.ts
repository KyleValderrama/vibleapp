import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Core } from 'src/common/entities/core.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
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
  @Column({ nullable: true, default: false })
  isVerified: boolean;

  @Field((type) => Boolean)
  @Column({ default: false })
  isSpotifyConnected: boolean;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  spotifyToken: string;

  @ManyToMany((type) => User, (user) => user.following, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  followers: User[];

  @ManyToMany((type) => User, (user) => user.followers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  following: User[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(_password: string): Promise<boolean> {
    return await bcrypt.compare(_password, this.password);
  }
}
