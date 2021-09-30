import { Injectable } from '@nestjs/common';
import {
  SpotifyTokenInput,
  SpotifyTokenResponse,
} from './dtos/spotify-token.dto';

@Injectable()
export class SpotifyService {
  async getSpotifyTokens({
    code,
    grantType,
    redirectUri,
  }: SpotifyTokenInput): Promise<SpotifyTokenResponse> {
    return {
      status: 'ok',
      message: 'Get Token Success!',
      scope: '',
      spotifyAccessToken: '',
      spotifyRefreshToken: '',
    };
  }
}
