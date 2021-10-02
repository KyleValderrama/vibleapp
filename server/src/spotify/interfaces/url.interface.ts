import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotifyRequestURLs {
  connect(): string {
    return 'https://accounts.spotify.com/api/token';
  }

  me(): string {
    return 'https://api.spotify.com/v1/me';
  }

  token(): string {
    return 'https://accounts.spotify.com/api/token';
  }
}
