import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class RelojesPrecintosDTO {

  @IsString()
  readonly nro_precinto: string;

  @IsNumber()
  readonly motivo: number;

  @IsString()
  readonly fecha_colocacion: string;
  
  @IsBoolean()
  @IsOptional()
  readonly activo: boolean;

  @IsNumber()
  readonly creatorUser: number;

  @IsNumber()
  readonly updatorUser: number;

}