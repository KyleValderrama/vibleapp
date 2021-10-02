import { Args, Resolver, Query } from '@nestjs/graphql';
import {
  ConnectSpotifyInput,
  ConnectSpotifyResponse,
} from './dtos/connect.dto';
import { SpotifyService } from './spotify.service';

@Resolver()
export class SpotifyResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query((returns) => ConnectSpotifyResponse)
  async connectSpotify(
    @Args('input') { code, grantType, redirectUri }: ConnectSpotifyInput,
  ) {
    return this.spotifyService.connectSpotify({
      code,
      grantType,
      redirectUri,
    });
  }
}
