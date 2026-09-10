import { Body,Post, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        console.log('Registering user with email:', dto.email);
        return this.authService.register(dto);
    }
}
