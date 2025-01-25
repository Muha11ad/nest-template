import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisOptions, typeOrmOptions } from '../options';
import { LoggerProvider } from './sub-providers/logger.provider';

@Module({
  imports: [
    ConfigModule,
    // CacheModule.registerAsync(redisOptions),
    TypeOrmModule.forRootAsync(typeOrmOptions),
  ],
  providers: [LoggerProvider, ConfigService],
  exports: [LoggerProvider, ConfigService],
})
export class ProviderModule {}
