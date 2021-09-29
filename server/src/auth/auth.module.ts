import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthModuleOptions,
  CONFIG_OPTIONS,
} from './interfaces/options.interface';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthResolver]
})
@Global()
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      providers: [{ provide: CONFIG_OPTIONS, useValue: options }, AuthService],
      exports: [AuthService],
    };
  }
}
