import { DynamicModule, Global, Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyResolver } from './spotify.resolver';
import { HttpModule } from '@nestjs/axios';
import {
  CONFIG_OPTIONS,
  SpotifyModuleOptions,
} from './interfaces/options.interface';
import { SpotifyRequestURLs } from './interfaces/url.interface';
import { SpotifyRequests } from './spotify.requests';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Token } from 'src/token/entities/token.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User, Token])],
})
@Global()
export class SpotifyModule {
  static forRoot(options: SpotifyModuleOptions): DynamicModule {
    return {
      module: SpotifyModule,
      providers: [
        { provide: CONFIG_OPTIONS, useValue: options },
        SpotifyService,
        SpotifyResolver,
        SpotifyRequestURLs,
        SpotifyRequests,
      ],
      exports: [SpotifyService],
    };
  }
}
