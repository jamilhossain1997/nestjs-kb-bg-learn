import { Body, Controller, Post,UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { createBoardDto } from './dto/create-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';

interface AuthUser{
    id: string;
    email: string;
    name: string;
}
@Controller('board')
@UseGuards(JwtAuthGuard)
export class BoardController {
    constructor(private readonly boardService: BoardService){}

     @Post()
        createBoard(@CurrentUser() user: AuthUser, @Body() dto: createBoardDto){
            return this.boardService.createBoard(user.id, dto);
        }
}
