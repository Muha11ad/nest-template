import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerProvider } from './sub-providers/logger.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtOptions, redisOptions, typeOrmOptions } from '../options';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(jwtOptions),
    // CacheModule.registerAsync(redisOptions),
    TypeOrmModule.forRootAsync(typeOrmOptions),
  ],
  providers: [LoggerProvider, ConfigService, JwtService],
  exports: [LoggerProvider, ConfigService, JwtService],
})
export class ProviderModule {}
