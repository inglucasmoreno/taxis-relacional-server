import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class LicenciasVehiculosDTO {

  @IsNumber()
  readonly vehiculo: number;
  
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
  readonly expediente: string;
  
  @IsOptional()
  @IsString()
  readonly libre_deuda_jf_anterior: string;
  
  @IsOptional()
  @IsString()
  readonly libre_deuda_jf_nuevo: string;
  
  @IsOptional()
  @IsString()
  readonly sellado_control_tecnico: string;
  
  @IsOptional()
  @IsString()
  readonly sellado_desinfeccion: string;
  
  @IsOptional()
  @IsString()
  readonly foto_libre_deuda_rentas: string;

  @IsOptional()
  @IsString()
  readonly foto_libre_deuda_comercio: string;

  @IsOptional()
  @IsString()
  readonly sellado_transferencia: string;

  @IsOptional()
  @IsBoolean()
  readonly activo: boolean;

  @IsNumber()
  creatorUser: number;

  @IsNumber()
  updatorUser: number;

}