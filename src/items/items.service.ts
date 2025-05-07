// src/items/items.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.item.findMany();
  }

  async findOne(id: number) {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Item ${id} not found`);
    return item;
  }

  create(dto: CreateItemDto) {
    return this.prisma.item.create({ data: dto });
  }

  update(id: number, dto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.item.delete({ where: { id } });
  }
}
