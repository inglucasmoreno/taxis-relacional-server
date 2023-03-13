import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class PersonasDTO {
    
    @IsString()
    apellido: string;

    @IsString()
    nombre: string;

    @IsString()
    dni: string;

    @IsString()
    domicilio: string;

    @IsString()
    mail: string;
    
    @IsString()
    telefono: string;

    @IsBoolean()
    @IsOptional()
    readonly sigem: boolean;

    @IsBoolean()
    @IsOptional()
    readonly activo: boolean;

    @IsNumber()
    creatorUser: number;

    @IsNumber()
    updatorUser: number;
    
}