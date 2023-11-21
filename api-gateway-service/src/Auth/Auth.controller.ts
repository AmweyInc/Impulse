import { Body, Controller, Headers, Post, UseFilters } from '@nestjs/common';
import { RpcExceptionFilter } from '../utils/GRPCExcreption.filter';
import { LoginDto, RegisterDto, UserAuthDto } from './dto/auth.dto';
import { AuthorizationToken } from './Auth.pb';
import { AuthService } from './Auth.service';


@Controller('auth')
@UseFilters(RpcExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async singUp(
    @Body() RegisterDto:RegisterDto,
  ): Promise<UserAuthDto> {
    return this.authService.signUp(RegisterDto)
  }

  @Post('signIn')
  async singIn(
    @Body() LoginDto:LoginDto,
  ): Promise<string> {
    return this.authService.signIn(LoginDto)
  }

  @Post('refresh')
  async refresh(@Headers('authorization') authHeader: string): Promise<AuthorizationToken> {
    return this.authService.refresh(authHeader)
  }
}