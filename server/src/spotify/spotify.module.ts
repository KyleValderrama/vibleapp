import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyResolver } from './spotify.resolver';

@Module({
  providers: [SpotifyService, SpotifyResolver]
})
export class SpotifyModule {}
