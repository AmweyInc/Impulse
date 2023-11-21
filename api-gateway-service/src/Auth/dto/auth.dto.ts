import { Trim } from 'class-sanitizer';
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly name?: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class UserAuthDto {
  @IsNumber()
  public readonly id!: number;

  @IsEmail()
  public readonly email!: string;

  @IsString()
  public readonly name?: string;
}