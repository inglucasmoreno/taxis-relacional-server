import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class VehiculosSegurosDTO {

    @IsNumber()
    readonly vehiculo: number;
    
    @IsNumber()
    readonly empresa: number;
    
    @IsString()
    readonly nro_poliza: string;
    
    @IsString()
    readonly fecha_desde: string;
    
    @IsString()
    readonly fecha_hasta: string;
    
    @IsBoolean()
    @IsOptional()
    readonly activo: boolean;

    @IsNumber()
    readonly creatorUser: number;
  
    @IsNumber()
    readonly updatorUser: number;
    
}