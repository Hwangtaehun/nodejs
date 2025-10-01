import { Body, Controller, Post } from '@nestjs/common';
import { CreateUseDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUseDto) {
    return await this.authService.register(userDto);
  }
}
