import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class VehiculosModelosDTO {
    
    @IsString()
    descripcion: string;
  
    @IsNumber()
    marca: number;

    @IsBoolean()
    @IsOptional()
    readonly activo: boolean;

    @IsNumber()
    readonly creatorUser: number;
  
    @IsNumber()
    readonly updatorUser: number;


}