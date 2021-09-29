import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ArgsType,
} from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'src/common/dtos/response.dto';
import { LoginInput, LoginResponse } from './dtos/login.dto';
import { ProfileInput, ProfileResponse } from './dtos/profile.dto';
import { RegisterInput, RegisterResponse } from './dtos/register.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => RegisterResponse)
  async register(@Args('input') registerInput: RegisterInput) {
    return await this.userService.register(registerInput);
  }

  @Mutation((returns) => LoginResponse)
  async login(@Args('input') loginInput: LoginInput) {
    return await this.userService.login(loginInput);
  }

  @Query((returns) => ProfileResponse)
  @UseGuards(AuthGuard)
  me(@AuthUser() user: User) {
    return user;
  }

  @Query((returns) => ProfileResponse)
  @UseGuards(AuthGuard)
  async user(@Args() { id }: ProfileInput) {
    return await this.userService.findById(id);
  }
}