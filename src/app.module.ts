import { Module } from '@nestjs/common';
import { ProviderModule } from './common/providers';

@Module({
  imports: [ProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
