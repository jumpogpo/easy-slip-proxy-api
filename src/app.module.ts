import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EasySlipModule } from './easyslip/easyslip.module';

@Module({
  imports: [PrismaModule, EasySlipModule],
})
export class AppModule {}
