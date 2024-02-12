import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance, AxiosError } from 'axios';

@Injectable()
export class EasySlipApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://developer.easyslip.com/api/v1',
      headers: {
        Authorization: `Bearer ${process.env.EASYSLIP_API_KEY}`,
      },
      timeout: 30000,
    });
  }

  async getApiInformation() {
    try {
      const response = await this.axiosInstance.get(`/me`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          throw new HttpException(error.response.data, error.response.status);
        } else if (error.request) {
          throw new HttpException(
            'Server did not respond',
            HttpStatus.GATEWAY_TIMEOUT,
          );
        } else {
          throw new HttpException(
            'An unknown error occurred',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      } else {
        throw new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async verifySlipByPayload(payload: string) {
    try {
      const response = await this.axiosInstance.get(
        `/verify?payload=${payload}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error.response.data;
        } else if (error.request) {
          throw new HttpException(
            'Server did not respond',
            HttpStatus.GATEWAY_TIMEOUT,
          );
        } else {
          throw new HttpException(
            'An unknown error occurred',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      } else {
        throw new HttpException(
          'An error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
