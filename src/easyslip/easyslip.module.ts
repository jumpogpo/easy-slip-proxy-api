import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { EasySlipService } from './easyslip.service';
import { EasySlipController } from './easyslip.controller';
import { EasySlipApiService } from 'src/lib/easyslip';

@Module({
  imports: [CacheModule.register()],
  controllers: [EasySlipController],
  providers: [EasySlipService, EasySlipApiService],
})
export class EasySlipModule {}
