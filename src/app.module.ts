import { Module } from '@nestjs/common';
import { UserModule } from './modules/user';
import { ProviderModule } from './common/providers';

@Module({
  imports: [ProviderModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
