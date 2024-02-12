import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EasySlipService } from './easyslip.service';
import { ApiTags, ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CacheKey } from '@nestjs/cache-manager';
import {
  EasySlipInformationResponseOk,
  EasySlipVerifyResponseOk,
} from './dto/easyslip.dto';

@ApiTags('EasySlip')
@Controller('v1')
export class EasySlipController {
  constructor(private readonly easySlipService: EasySlipService) {}

  @Get('info')
  @ApiResponse({ status: 200, type: EasySlipInformationResponseOk })
  @ApiResponse({
    status: 400,
    description:
      '1) invalid_payload\n2) invalid_image\n3) image_size_too_large',
  })
  @ApiResponse({
    status: 401,
    description: '1) unauthorized',
  })
  @ApiResponse({
    status: 403,
    description:
      '1) access_denied\n2) account_not_verified\n3) application_expired\n4) application_deactivated\n5) quota_exceeded',
  })
  @ApiResponse({
    status: 404,
    description: '1) slip_not_found\n2) qrcode_not_found',
  })
  @ApiResponse({
    status: 405,
    description: '1) method_not_allowed',
  })
  @ApiResponse({
    status: 500,
    description: '1) server_error\n2) api_server_error',
  })
  getApiInformation() {
    return this.easySlipService.getApiInformation();
  }

  @Get('verify')
  @CacheKey('transactionId')
  @ApiResponse({
    status: 200,
    description: 'Transaction data retrieved successfully',
    type: EasySlipVerifyResponseOk,
  })
  @ApiResponse({
    status: 400,
    description:
      '1) invalid_payload\n2) invalid_image\n3) image_size_too_large',
  })
  @ApiResponse({
    status: 401,
    description: '1) unauthorized',
  })
  @ApiResponse({
    status: 403,
    description:
      '1) access_denied\n2) account_not_verified\n3) application_expired\n4) application_deactivated\n5) quota_exceeded',
  })
  @ApiResponse({
    status: 404,
    description: '1) slip_not_found\n2) qrcode_not_found',
  })
  @ApiResponse({
    status: 405,
    description: '1) method_not_allowed',
  })
  @ApiResponse({
    status: 500,
    description: '1) server_error\n2) api_server_error',
  })
  getTransactionDataById(@Query('transactionId') transactionId: string) {
    return this.easySlipService.getTransactionDataById(transactionId);
  }

  @Post('verify')
  @CacheKey('transactionId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 200,
    description: 'Transaction data retrieved successfully',
    type: EasySlipVerifyResponseOk,
  })
  @ApiResponse({
    status: 400,
    description:
      '1) invalid_payload\n2) invalid_image\n3) image_size_too_large',
  })
  @ApiResponse({
    status: 401,
    description: '1) unauthorized',
  })
  @ApiResponse({
    status: 403,
    description:
      '1) access_denied\n2) account_not_verified\n3) application_expired\n4) application_deactivated\n5) quota_exceeded',
  })
  @ApiResponse({
    status: 404,
    description: '1) slip_not_found\n2) qrcode_not_found',
  })
  @ApiResponse({
    status: 405,
    description: '1) method_not_allowed',
  })
  @ApiResponse({
    status: 500,
    description: '1) server_error\n2) api_server_error',
  })
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 4000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.easySlipService.getTransactionDataByBuffer(file.buffer);
  }
}
