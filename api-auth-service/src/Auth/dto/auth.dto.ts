import { Trim } from 'class-sanitizer';
import {IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength} from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  public password: string;

  @IsString()
  @IsOptional()
  public name?: string;
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

export class UserAuthResponse {
  @IsString()
  public readonly token!: string;
}

export class UserSignUpResponse {
  @IsBoolean()
  public accountCreate: boolean;
}

export class UserCreateDto {
  @IsBoolean()
  public create: boolean;
}

export class UserTokenDto {
  @IsNumber()
  public id: number;

  @IsString()
  public email: string;

  @IsNumber()
  public readonly iat: number;

  @IsNumber()
  public readonly exp: number;
}