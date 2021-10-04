import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Core } from 'src/common/entities/core.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Token extends Core {
  @Field((type) => String)
  @Column()
  local: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  spotify: string;

  @OneToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
