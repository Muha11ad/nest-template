import { config } from 'dotenv';
import { NotAcceptableException } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
export const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean | string) => void,
  ) => {
    if (origin === undefined) {
      callback(new NotAcceptableException('Origin is not defined'), false);
    } else if (allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new NotAcceptableException(`Origin ${origin} is not allowed`));
    }
  },
  credentials: true,
};
