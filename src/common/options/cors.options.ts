import { NotAcceptableException } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

export const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean | string) => void,
  ) => {
    if (!origin) {
      console.log('Origin not provided');
      callback(null, true);
    } else if (allowedOrigins.includes(origin)) {
      console.log('Origin allowed:', origin);
      callback(null, origin);
    } else {
      console.log('Origin not allowed:', origin);
      callback(new NotAcceptableException(`Origin ${origin} is not allowed`));
    }
  },
  credentials: true,
};
