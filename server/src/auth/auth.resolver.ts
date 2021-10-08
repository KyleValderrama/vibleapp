import { Args, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenInput, TokenResponse } from './dtos/token.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => TokenResponse)
  getToken(@Args() { refreshToken }: TokenInput) {
    return this.authService.getToken({ refreshToken });
  }
}
