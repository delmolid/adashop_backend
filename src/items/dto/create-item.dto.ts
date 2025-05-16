// src\items\dto\create-item.dto.ts

import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDto {
  @IsString() @ApiProperty({ example: "Coffee Mug" }) name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: "Coffee Mug" })
  description?: string;
}
