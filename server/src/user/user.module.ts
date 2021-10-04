import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/token/entities/token.entity';
import { User } from './entities/user.entity';
import { Verfication } from './entities/verification.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verfication, Token])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
