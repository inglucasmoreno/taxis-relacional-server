import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class TiposServiciosUpdateDTO {
    
    @IsString()
    @IsOptional()
    descripcion: string;
  
    @IsBoolean()
    @IsOptional()
    readonly activo: boolean;

    @IsNumber()
    @IsOptional()
    creatorUser: number;

    @IsNumber()
    @IsOptional()
    updatorUser: number;
    
}