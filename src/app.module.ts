import { Module } from '@nestjs/common';
import { UserModule } from './modules/user';
import { ProviderModule } from './common/providers';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [ProviderModule, UserModule],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule {}
