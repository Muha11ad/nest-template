import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerProvider extends ConsoleLogger {
  logError(place: string, code: number, message: string) {
    this.error(`[${place}] - Code: ${code}, Message: ${message}`);
  }
}
