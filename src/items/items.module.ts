import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, PrismaService],
})
export class ItemsModule {}
