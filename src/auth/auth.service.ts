import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, CredentialsDto } from 'src/auth/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return await this.prisma.user.create({
      data: {
        username,
        password: hashPassword,
        status,
      },
    });
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }

    throw new UnauthorizedException('please confirm your username or password');
  }
}
