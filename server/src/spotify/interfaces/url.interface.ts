import { Injectable } from '@nestjs/common';

const accountsUrl: string = 'https://accounts.spotify.com';
const baseUrl: string = 'https://api.spotify.com';
const v: string = 'v1';

@Injectable()
export class SpotifyRequestURLs {
  connect(): string {
    return `${accountsUrl}/api/token`;
  }

  token(): string {
    return `${accountsUrl}/api/token`;
  }

  me(): string {
    return `${baseUrl}/${v}/me`;
  }

  recentlyPlayed(): string {
    return `${baseUrl}/${v}/me/player/recently-played`;
  }

  tracks(): string {
    return `${baseUrl}/${v}/tracks`;
  }
}
