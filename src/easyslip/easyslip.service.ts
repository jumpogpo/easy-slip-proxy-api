import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EasySlipApiService } from 'src/lib/easyslip';
import { Transactions } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as QrCode from 'qrcode-reader';
import Jimp from 'jimp';

@Injectable()
export class EasySlipService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly easySlipApiService: EasySlipApiService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private qrCodeInstance = new QrCode();

  private async decodeTextFromBuffer(buffer: Buffer): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const img = await Jimp.read(buffer);
        this.qrCodeInstance.callback = function (err, value) {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(value.result);
          }
        };
        this.qrCodeInstance.decode(img.bitmap);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Format data before response to user
  private async formatResponse(transactionId: string, data: Transactions) {
    if (data.status === 200) {
      return { status: data.status, data: data.data };
    } else {
      throw new HttpException(
        { status: data.status, message: data.message },
        data['status'],
      );
    }
  }

  // Get transaction id from Qr code
  private async getTransactionIdFromBuffer(buffer: Buffer) {
    try {
      return await this.decodeTextFromBuffer(buffer);
    } catch (error) {
      throw new BadRequestException({
        status: 400,
        message: "Can't find transactionId in qr code",
      });
    }
  }

  // Get transaction record from database
  private async getTransactionRecord(transactionId: string) {
    try {
      return await this.prismaService.transactions.findFirst({
        where: { transactionId },
      });
    } catch (error) {
      throw new Error('Error accessing database');
    }
  }

  // Create transaction in database
  private async createTransactionRecord(
    transactionId: string,
    transactionData: Transactions,
  ) {
    try {
      return await this.prismaService.transactions.create({
        data: { transactionId: transactionId, ...transactionData },
      });
    } catch (error) {
      throw new Error('Error creating transaction record');
    }
  }

  // Get information of api
  async getApiInformation() {
    return await this.easySlipApiService.getApiInformation();
  }

  // Get transaction data by id
  async getTransactionDataById(transactionId: string) {
    const cache: Transactions = await this.cacheManager.get(transactionId);
    if (cache) return this.formatResponse(transactionId, cache);

    let transactionRecord = await this.getTransactionRecord(transactionId);

    if (!transactionRecord) {
      const transactionData =
        await this.easySlipApiService.verifySlipByPayload(transactionId);
      transactionRecord = await this.createTransactionRecord(
        transactionId,
        transactionData,
      );
    }

    await this.cacheManager.set(transactionId, transactionRecord);
    return this.formatResponse(transactionId, transactionRecord);
  }

  // Get transaction data by file
  async getTransactionDataByBuffer(buffer: Buffer) {
    const transactionId = await this.getTransactionIdFromBuffer(buffer);

    const cache: Transactions = await this.cacheManager.get(transactionId);
    if (cache) return this.formatResponse(transactionId, cache);

    let transactionRecord = await this.getTransactionRecord(transactionId);

    if (!transactionRecord) {
      const transactionData =
        await this.easySlipApiService.verifySlipByPayload(transactionId);
      transactionRecord = await this.createTransactionRecord(
        transactionId,
        transactionData,
      );
    }

    await this.cacheManager.set(transactionId, transactionRecord);
    return this.formatResponse(transactionId, transactionRecord);
  }
}
