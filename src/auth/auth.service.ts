import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async register(dto: RegisterDto) {
        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                passwordHash: hashedPassword,
            }
        })

        return this.buildAuthResponse(newUser.id,newUser.email,newUser.name); 

    }

    async login(dto: LoginDto){
        const userEmailCheck = await this.prisma.user.findUnique({
             where:{email:dto.email},
        })

        if(!userEmailCheck){
            throw new Error('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(dto.password,userEmailCheck.passwordHash);

        if(!passwordMatch){
            throw new Error('Invalid email or password');
        }

        return this.buildAuthResponse(userEmailCheck.id,userEmailCheck.email,userEmailCheck.name);

    }

    private async buildAuthResponse(id:string,email:string,name:string){
        const token = await this.jwtService.sign({sub:id,email,name});
        return {

            user:{
                id,
                email,
                name
            },
            token
        }
    }


}
