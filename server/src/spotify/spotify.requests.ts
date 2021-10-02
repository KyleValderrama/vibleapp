import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import { AxiosError } from 'axios';
import { catchError, map, Observable, Observer } from 'rxjs';
import { ConnectSpotifyInput } from './dtos/connect.dto';
import {
  CONFIG_OPTIONS,
  SpotifyModuleOptions,
} from './interfaces/options.interface';
import { SpotifyRequestURLs } from './interfaces/url.interface';

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
      .pipe(
        catchError((error: AxiosError) => {
          return new Observable((observer: Observer<AxiosResponse>) => {
            observer.next(error.response);
          });
        }),
        map((result: AxiosResponse) => {
          return result;
        }),
      );
  }
}
