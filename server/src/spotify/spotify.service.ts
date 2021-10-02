import { Injectable } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import { first, firstValueFrom, map } from 'rxjs';
import {
  ConnectSpotifyInput,
  ConnectSpotifyResponse,
} from './dtos/connect.dto';
import { SpotifyRequests } from './spotify.requests';

@Injectable()
export class SpotifyService {
  constructor(private readonly requests: SpotifyRequests) {}

  async connectSpotify({
    code,
    grantType,
    redirectUri,
  }: ConnectSpotifyInput): Promise<ConnectSpotifyResponse> {
    const response: AxiosResponse = await firstValueFrom(
      this.requests.connect({ code, grantType, redirectUri }),
    );

    if (response.status === 200) {
      return {
        status: 'ok',
        message: 'Account Connected!',
        scope: response.data.scope,
        spotifyAccessToken: response.data.access_token,
        spotifyRefreshToken: response.data.refresh_token,
      };
    } else {
      return {
        status: 'error',
        message: response.data.error_description,
      };
    }
  }
}
