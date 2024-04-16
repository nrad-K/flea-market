import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, CredentialsDto } from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.authService.signUp(createUserDto);
    const {
      password: {},
      ...resUser
    } = user;
    return resUser;
  }

  @Post('signin')
  async signIn(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(credentialsDto);
  }
}
