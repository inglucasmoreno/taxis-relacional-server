import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class SegurosEmpresasDTO {

  @IsString()
  readonly descripcion: string;

  @IsString()
  readonly direccion: string;

  @IsString()
  readonly telefono: string;

  @IsBoolean()
  @IsOptional()
  readonly activo: boolean;

  @IsNumber()
  readonly creatorUser: number;

  @IsNumber()
  readonly updatorUser: number;

}