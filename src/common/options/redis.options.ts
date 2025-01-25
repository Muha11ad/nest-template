import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';

export const redisOptions: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    try {
      const store = await redisStore({
        socket: {
          host: "localhost",
          port: 6379,
        },
      });

      return {
        store,
        ttl: 600, // 10 minutes in seconds
      };
    } catch (error) {}
  },
  inject: [ConfigService],
};
