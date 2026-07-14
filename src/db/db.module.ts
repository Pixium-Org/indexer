import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Global so `PrismaService` doesn't need to be re-imported into every
 * feature module that needs DB access. Import `DbModule` once, in
 * `AppModule`.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DbModule {}
