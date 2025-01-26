import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CardEntity, UserEntity } from '@/database/entities';

export function getCredentials(configService: ConfigService) {
  return {
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
  };
}

export function getMigrationDetails() {
  const pathToMigrations = join(__dirname, '..', '..', 'database', 'migrations', '*{.ts,.js}');
  return {
    migrations: [pathToMigrations],
    migrationsRun: false,
  };
}

export const typeOrmOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    try {
      return {
        type: 'postgres',
        ...getCredentials(configService),
        ...getMigrationDetails(),
        entities: [UserEntity, CardEntity],
      };
    } catch (error) {}
  },
  inject: [ConfigService],
};
