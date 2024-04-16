import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
