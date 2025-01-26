import { Module } from '@nestjs/common';
import { UserModule } from './modules/user';
import { CardModule } from './modules/card';
import { ProviderModule } from './common/providers';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [ProviderModule, UserModule, CardModule],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule {}
