import {IsEmail,MinLength,IsNotEmpty,IsString} from 'class-validator';


export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

}