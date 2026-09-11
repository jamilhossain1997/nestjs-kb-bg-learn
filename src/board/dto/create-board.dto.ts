import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class createBoardDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    title: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    description: string;
}