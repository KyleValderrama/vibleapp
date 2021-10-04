import { Injectable } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Token } from 'src/token/entities/token.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConnectSpotifyResponse } from './dtos/connect.dto';
import { TokenInput, SpotifyTokenResponse } from './dtos/token.dto';
import { SpotifyRequests } from './spotify.requests';

@Injectable()
export class SpotifyService {
  constructor(
    private readonly requests: SpotifyRequests,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Token) private readonly token: Repository<Token>,
  ) {}

  async connectSpotify({
    code,
    grantType,
    redirectUri,
    user,
  }): Promise<ConnectSpotifyResponse> {
    const connectResponse: AxiosResponse = await firstValueFrom(
      this.requests.connect({ code, grantType, redirectUri }),
    );

    if (connectResponse.status === 200) {
      const meResponse: AxiosResponse = await firstValueFrom(
        this.requests.me({ accessToken: connectResponse.data.access_token }),
      );

      if (meResponse.status === 200) {
        this.user.update(
          { id: user.id },
          {
            isSpotifyConnected: true,
            displayName: meResponse.data.display_name,
            spotifyUrl: meResponse.data.external_urls.spotify,
            spotifyId: meResponse.data.id,
            photo: meResponse.data.images[0].url,
          },
        );

        this.token.update(
          { user: user.id },
          { spotify: connectResponse.data.refresh_token },
        );

        return {
          status: 'ok',
          message: 'Account Connected!',
          scope: connectResponse.data.scope,
          spotifyAccessToken: connectResponse.data.access_token,
          spotifyRefreshToken: connectResponse.data.refresh_token,
        };
      }
    }
    return {
      status: 'error',
      message: connectResponse.data.error_description,
    };
  }

  async getSpotifyToken({
    refreshToken,
    grantType,
  }: TokenInput): Promise<SpotifyTokenResponse> {
    const tokenResponse: AxiosResponse = await firstValueFrom(
      this.requests.token({ grantType, refreshToken }),
    );

    if (tokenResponse.status === 200) {
      return {
        status: 'ok',
        message: "Here's your spotify Access Token",
        accessToken: tokenResponse.data.access_token,
      };
    }

    return {
      status: 'error',
      message: tokenResponse.data.error_description,
    };
  }
}
