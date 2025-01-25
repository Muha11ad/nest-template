import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CardEntity, UserEntity } from './entities';
import { getCredentials, getMigrationDetails } from '@/common/options/typeOrm.options';

config();
const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  ...getCredentials(configService),
  ...getMigrationDetails(),
  entities: [UserEntity, CardEntity],
});
