// src/app.module.ts

import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ItemsModule],
  providers: [PrismaService],
})
export class AppModule {}
