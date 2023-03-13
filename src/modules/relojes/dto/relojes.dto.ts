import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class RelojesDTO {

  @IsString()
  readonly nro_serie: string;
  
  @IsNumber()
  readonly marca: number;

  @IsNumber()
  readonly modelo: number;

  @IsBoolean()
  @IsOptional()
  readonly activo: boolean;

  @IsNumber()
  creatorUser: number;

  @IsNumber()
  updatorUser: number;

}