import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    constructor(private readonly prisma: PrismaService) { }

    async createBoard(userId: string, dto: createBoardDto) {
        const board = await this.prisma.board.create({
            data: {
                title: dto.title,
                description: dto.description,
                ownerId: userId,
                members: {
                    create: {
                        userId: userId,
                        role: 'OWNER',
                    },
                }
            },

            include: { members: { include: { user: { select: { id: true, name: true, email: true } } } } },
        })


      return board;
    }
}
