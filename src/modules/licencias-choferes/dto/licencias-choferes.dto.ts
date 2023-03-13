import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class LicenciasChoferesDTO {

  @IsNumber()
  readonly persona: number;
  
  @IsNumber()
  readonly licencia: number;
  
  @IsOptional()
  @IsString()
  readonly fecha_alta: string;
  
  @IsOptional()
  @IsString()
  readonly fecha_baja: string;
  
  @IsOptional()
  @IsString()
  readonly libreta_sanitaria: string;
  
  @IsOptional()
  @IsString()
  readonly carnet_conducir_vencimiento: string;
  
  @IsOptional()
  @IsString()
  readonly certificado_antecedentes: string;

  @IsOptional()
  @IsString()
  readonly seguro_accidentes_personales: string;

  @IsOptional()
  @IsString()
  readonly motivo_baja: string;
  
  @IsOptional()
  @IsBoolean()
  readonly activo: boolean;

  @IsNumber()
  creatorUser: number;

  @IsNumber()
  updatorUser: number;

}