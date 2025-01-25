import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerProvider extends ConsoleLogger {
  logError(place: string, code: string, message: string) {
    this.error(`[${place}] - Code: ${code}, Message: ${message}`);
  }
}
