import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UsuariosDTO {
    
    @IsString()
    readonly usuario: string;
    
    @IsString()
    readonly dni: string;
    
    @IsString()
    apellido: string;
   
    @IsString()
    nombre: string;
    
    @IsString()
    password: string;

    @IsString()
    email: string;
    
    @IsString()
    @IsOptional()
    readonly role: string;
  
    @IsBoolean()
    @IsOptional()
    readonly activo: boolean;

}