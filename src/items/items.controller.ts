// src\items\items.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { ItemsService } from "./items.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";

@Controller("items")
export class ItemsController {
  constructor(private readonly items: ItemsService) {}

  @Post()
  create(@Body() dto: CreateItemDto) {
    return this.items.create(dto);
  }

  @Get()
  findAll() {
    return this.items.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.items.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateItemDto) {
    return this.items.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.items.remove(id);
  }
}
