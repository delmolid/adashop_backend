// src\prisma.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Wraps the PrismaClient so it can be injected and
 * properly connected/disconnected with the Nest lifecycle.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Called once Nest has initialized all providers.
   * Establishes the database connection.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Called just before the application is terminated.
   * Closes the database connection.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
