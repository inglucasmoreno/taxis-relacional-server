import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class VehiculosTitularesDTO {
    
    @IsString()
    numero_titulo: string;

    @IsNumber()
    persona: number;

    @IsNumber()
    vehiculo: number;

    @IsNumber()
    porcentaje: number;

    @IsString()
    @IsOptional()
    fecha_inscripcion_inicial: string;

    @IsBoolean()
    @IsOptional()
    activo: boolean;

    @IsNumber()
    creatorUser: number;

    @IsNumber()
    updatorUser: number;
    
}