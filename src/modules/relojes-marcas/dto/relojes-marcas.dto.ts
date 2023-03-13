import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class RelojesMarcasDTO {

  @IsString()
  readonly descripcion: string;
  
  @IsBoolean()
  @IsOptional()
  readonly activo: boolean;

  @IsNumber()
  readonly creatorUser: number;

  @IsNumber()
  readonly updatorUser: number;

}