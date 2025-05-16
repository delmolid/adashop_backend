// src\app.module.ts

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ItemsModule } from "./items/items.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to re-import in other modules
      envFilePath: ".env", // relative to your project root
    }),
    PrismaModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
