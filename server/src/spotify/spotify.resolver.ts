import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileResponse } from 'src/user/dtos/profile.dto';
import {
  ConnectSpotifyInput,
  ConnectSpotifyResponse,
} from './dtos/connect.dto';
import { RecentlyPlayedInput, RecentlyPlayedResponse } from './dtos/recent.dto';
import { SpotifyTokenResponse, TokenInput } from './dtos/token.dto';
import { SpotifyService } from './spotify.service';

@Resolver()
export class SpotifyResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Mutation((returns) => ConnectSpotifyResponse)
  @UseGuards(AuthGuard)
  async connectSpotify(
    @AuthUser() { user }: ProfileResponse,
    @Args('input') { code, grantType, redirectUri }: ConnectSpotifyInput,
  ) {
    return this.spotifyService.connectSpotify({
      code,
      grantType,
      redirectUri,
      user,
    });
  }

  @Query((returns) => SpotifyTokenResponse)
  @UseGuards(AuthGuard)
  async getSpotifyToken(
    @Args('input') { refreshToken, grantType }: TokenInput,
  ) {
    return this.spotifyService.getSpotifyToken({
      refreshToken,
      grantType,
    });
  }

  @Query((returns) => RecentlyPlayedResponse)
  @UseGuards(AuthGuard)
  recentlyPlayed(@Args() { token }: RecentlyPlayedInput) {
    return this.spotifyService.recentlyPlayed({ token });
  }
}
