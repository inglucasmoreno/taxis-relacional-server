import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class LicenciasDTO {

  @IsString()
  readonly nro_licencia: string;

  @IsNumber()
  readonly tipo_servicio: number;

  @IsString()
  @IsOptional()
  readonly estado: string;
  
  @IsBoolean()
  @IsOptional()
  readonly activo: boolean;

  @IsNumber()
  creatorUser: number;

  @IsNumber()
  updatorUser: number;

}