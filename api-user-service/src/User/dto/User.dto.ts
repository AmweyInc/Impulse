import { Trim } from "class-sanitizer";
import {IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength} from "class-validator";

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

export class UserExistDto {
    @IsBoolean()
    public exist: boolean;
}

export class UserCreateDto {
    @IsBoolean()
    public create: boolean;
}

export class UserGetDto extends RegisterDto {
    @IsNumber()
    public readonly id: number;

}