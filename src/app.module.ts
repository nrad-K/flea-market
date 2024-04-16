import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
