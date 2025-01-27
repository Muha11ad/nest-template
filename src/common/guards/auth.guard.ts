import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface MyRequest extends Request {
  user?: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<MyRequest>();

    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const secret = this.configService.get<string>('JWT_SECRET') || 'default';
      const { email } = this.jwtService.verify(token, { secret });

      if (!email) {
        throw new UnauthorizedException('Token does not contain email');
      }
      request.user = email;
      return true;
    } catch (error) {
      return false;
    }
  }
}
