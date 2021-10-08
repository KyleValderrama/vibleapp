import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import { AxiosError } from 'axios';
import { catchError, map, Observable, Observer, pipe } from 'rxjs';
import { ConnectSpotifyInput } from './dtos/connect.dto';
import { MeInput } from './dtos/me.dto';
import { RecentlyPlayedInput } from './dtos/recent.dto';
import { TokenInput } from './dtos/token.dto';
import { TracksInput } from './dtos/tracks.dto';
import {
  CONFIG_OPTIONS,
  SpotifyModuleOptions,
} from './interfaces/options.interface';
import { SpotifyRequestURLs } from './interfaces/url.interface';

const pipeOptions = () =>
  pipe(
    catchError((error: AxiosError) => {
      return new Observable((observer: Observer<AxiosResponse>) => {
        observer.next(error.response);
      });
    }),
    map((result: AxiosResponse) => {
      return result;
    }),
  );

@Injectable()
export class SpotifyRequests {
  constructor(
    private readonly httpService: HttpService,
    private requestUrls: SpotifyRequestURLs,
    @Inject(CONFIG_OPTIONS) private readonly options: SpotifyModuleOptions,
  ) {}

  connect({
    code,
    grantType,
    redirectUri,
  }: ConnectSpotifyInput): Observable<AxiosResponse> {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('grant_type', grantType);
    params.append('redirect_uri', redirectUri);

    const auth = {
      username: this.options.cliendId,
      password: this.options.clientSecret,
    };

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    return this.httpService
      .post(this.requestUrls.connect(), params, {
        auth,
        headers,
      })
      .pipe(pipeOptions());
  }

  me({ accessToken }: MeInput): Observable<AxiosResponse> {
    const headers = { Authorization: `Bearer ${accessToken}` };
    return this.httpService
      .get(this.requestUrls.me(), { headers })
      .pipe(pipeOptions());
  }

  token({ refreshToken, grantType }: TokenInput): Observable<AxiosResponse> {
    const params = new URLSearchParams();
    params.append('refresh_token', refreshToken);
    params.append('grant_type', grantType);

    const auth = {
      username: this.options.cliendId,
      password: this.options.clientSecret,
    };

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    return this.httpService
      .post(this.requestUrls.token(), params, {
        auth,
        headers,
      })
      .pipe(pipeOptions());
  }

  recentlyPlayed({ token }: RecentlyPlayedInput): Observable<AxiosResponse> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpService
      .get(this.requestUrls.recentlyPlayed(), {
        headers,
      })
      .pipe(pipeOptions());
  }

  tracks({ token, ids }: TracksInput): Observable<AxiosResponse> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpService
      .get(`${this.requestUrls.tracks()}?ids=${ids.join(',')}`, {
        headers,
      })
      .pipe(pipeOptions());
  }
}
