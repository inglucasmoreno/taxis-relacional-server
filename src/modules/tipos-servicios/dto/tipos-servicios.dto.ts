import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class TiposServiciosDTO {
    
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