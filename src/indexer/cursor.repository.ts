import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

/**
 * Persists the last-processed RPC event cursor per contract, so
 * `IndexerService` can resume after a restart instead of re-polling
 * from `START_LEDGER` every time.
 */
@Injectable()
export class CursorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(contractId: string): Promise<string | undefined> {
    const row = await this.prisma.indexerCursor.findUnique({
      where: { contractId },
    });

    return row?.cursor;
  }

  async set(contractId: string, cursor: string): Promise<void> {
    await this.prisma.indexerCursor.upsert({
      where: { contractId },
      create: { contractId, cursor },
      update: { cursor },
    });
  }
}
