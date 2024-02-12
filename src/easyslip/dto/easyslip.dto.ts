import { ApiResponseProperty } from '@nestjs/swagger';

export class LocalDto {
  @ApiResponseProperty({ type: Number, example: 0 })
  amount?: number;

  @ApiResponseProperty({ type: String, example: '' })
  currency?: string;
}

export class AmountDto {
  @ApiResponseProperty({ type: Number, example: 1000 })
  amount: number;

  @ApiResponseProperty({ type: LocalDto })
  local?: LocalDto;
}

export class BankDto {
  @ApiResponseProperty({ type: String, example: '001' })
  id: string;

  @ApiResponseProperty({ type: String, example: 'กสิกรไทย' })
  name?: string;

  @ApiResponseProperty({ type: String, example: 'KBANK' })
  short?: string;
}

export class NameDto {
  @ApiResponseProperty({
    type: String,
    example: 'นาย อีซี่ สลิป',
  })
  th?: string;

  @ApiResponseProperty({
    type: String,
    example: 'MR. EASY SLIP',
  })
  en?: string;
}

export class BankAccountDto {
  @ApiResponseProperty({ type: String, example: 'BANKAC' })
  type: string;

  @ApiResponseProperty({ type: String, example: '1234xxxx5678' })
  account: string;
}

export class ProxyDto {
  @ApiResponseProperty({ type: String, example: 'EWALLETID' })
  type: string;

  @ApiResponseProperty({ type: String, example: '123xxxxxxxx4567' })
  account: string;
}

export class AccountDto {
  @ApiResponseProperty({ type: NameDto })
  name: NameDto;

  @ApiResponseProperty({ type: BankAccountDto })
  bank?: BankAccountDto;

  @ApiResponseProperty({ type: ProxyDto })
  proxy?: ProxyDto;
}

export class TransactionDto {
  @ApiResponseProperty({
    type: String,
    example: '00000000000000000000000000000000000000000000000000000000000',
  })
  payload: string;

  @ApiResponseProperty({ type: String, example: '68370160657749I376388B35' })
  transRef: string;

  @ApiResponseProperty({ type: String, example: '2023-01-01T00:00:00+07:00' })
  date: string;

  @ApiResponseProperty({ type: String, example: 'TH' })
  countryCode: string;

  @ApiResponseProperty({ type: AmountDto })
  amount: AmountDto;

  @ApiResponseProperty({ type: Number, example: 0 })
  fee: number;

  @ApiResponseProperty({ type: String, example: '' })
  ref1: string;

  @ApiResponseProperty({ type: String, example: '' })
  ref2: string;

  @ApiResponseProperty({ type: String, example: '' })
  ref3: string;

  @ApiResponseProperty({ type: BankDto })
  sender: {
    bank: BankDto;
    account: AccountDto;
  };

  @ApiResponseProperty({ type: BankDto })
  receiver: {
    bank: BankDto;
    account: AccountDto;
    merchantId?: string;
  };
}

export class EasySlipVerifyResponseOk {
  @ApiResponseProperty({ type: Number, example: 200 })
  status: number;

  @ApiResponseProperty({ type: TransactionDto })
  data: TransactionDto;
}

export class InformationDto {
  @ApiResponseProperty({ type: String, example: 'Easy Slip Developer' })
  application: string;

  @ApiResponseProperty({ type: Number, example: 16 })
  usedQuota: number;

  @ApiResponseProperty({ type: Number, example: 35000 })
  maxQuota: number;

  @ApiResponseProperty({ type: Number, example: 34984 })
  remainingQuota: number;
}

export class EasySlipInformationResponseOk {
  @ApiResponseProperty({ type: Number, example: 200 })
  status: number;

  @ApiResponseProperty({ type: InformationDto })
  data: InformationDto;
}
