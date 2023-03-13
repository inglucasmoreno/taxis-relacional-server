import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class VehiculosMarcasDTO {
    
    @IsString()
    descripcion: string;
  
    @IsBoolean()
    @IsOptional()
    readonly activo: boolean;

    @IsNumber()
    creatorUser: number;

    @IsNumber()
    updatorUser: number;

}