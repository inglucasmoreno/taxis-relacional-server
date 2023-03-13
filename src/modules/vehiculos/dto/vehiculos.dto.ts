import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class VehiculosDTO {
    
    @IsString()
    patente: string;

    @IsNumber()
    marca: number;

    @IsNumber()
    @IsOptional()
    modelo: number;

    @IsNumber()
    color: number;
  
    @IsNumber()
    ano: number;

    @IsString()
    @IsOptional()
    motor: string;

    @IsString()
    @IsOptional()
    chasis: string;

    @IsBoolean()
    @IsOptional()
    readonly activo: boolean;

    @IsNumber()
    readonly creatorUser: number;
  
    @IsNumber()
    readonly updatorUser: number;  
    
}