import { UserStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}

export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
