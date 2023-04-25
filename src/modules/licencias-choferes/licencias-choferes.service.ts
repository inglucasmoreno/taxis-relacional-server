import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LicenciasChoferes } from './entities';

@Injectable()
export class LicenciasChoferesService {

  constructor(
    @InjectRepository(LicenciasChoferes) private readonly licenciasChoferesRepository: Repository<LicenciasChoferes>
  ) { }

  // Relacion por ID
  async getId(id: number): Promise<LicenciasChoferes> {

    const relacion = await this.licenciasChoferesRepository.findOne({ relations: ['licencia', 'persona', 'creatorUser', 'updatorUser'], where: { id } });
    if (!relacion) throw new NotFoundException('La relacion no existe');
    return relacion;
  
  }
  
  // Listar relaciones
  async getAll({ columna, direccion }: any): Promise<LicenciasChoferes[]> {

    let order = {};

    if(columna === 'apellido'){
      order = { persona: { apellido: Number(direccion) }}
    }
    else if(columna === 'nombre'){
      order = { persona: { nombre: Number(direccion) }}
    }
    else if(columna === 'dni'){
      order = { persona: { dni: Number(direccion) }}
    }
    else{
      order[columna] = Number(direccion);
    }

    const relaciones = await this.licenciasChoferesRepository.find({ 
      relations: ['licencia', 'persona', 'creatorUser', 'updatorUser'], 
      order
    });

    return relaciones;

  }

  // Crear relacion
  async insert(licenciasChoferesDTO: any): Promise<LicenciasChoferes[]> {
       
    const { licencia, persona } = licenciasChoferesDTO;

    const relacionExistente = await this.licenciasChoferesRepository.find({ 
      where: { 
        activo: true, 
        licencia: { id: licencia }, 
        persona: { id: persona } 
      } 
    });
    if(relacionExistente.length !== 0) throw new NotFoundException('El chofer ya esta dado de alta en esta licencia');

    // Uppercase
    licenciasChoferesDTO.libreta_sanitaria = licenciasChoferesDTO.libreta_sanitaria?.toLocaleUpperCase().trim();
    licenciasChoferesDTO.certificado_antecedentes = licenciasChoferesDTO.certificado_antecedentes?.toLocaleUpperCase().trim();
    licenciasChoferesDTO.seguro_accidentes_personales = licenciasChoferesDTO.seguro_accidentes_personales?.toLocaleUpperCase().trim();
    licenciasChoferesDTO.motivo_baja = licenciasChoferesDTO.motivo_baja?.toLocaleUpperCase().trim();
    
    const nuevaRelacion = await this.licenciasChoferesRepository.create(licenciasChoferesDTO);
    return this.licenciasChoferesRepository.save(nuevaRelacion);

  }

  // Actualizar relacion
  async update(id: number, licenciasChoferesUpdateDTO: any): Promise<any> {

    const relacionDB = await this.licenciasChoferesRepository.findOneBy({ id });

    // Verificacion: El chofer no existe
    if (!relacionDB) throw new NotFoundException('La relacion no existe');

    // Uppercase
    licenciasChoferesUpdateDTO.libreta_sanitaria = licenciasChoferesUpdateDTO.libreta_sanitaria?.toLocaleUpperCase().trim();
    licenciasChoferesUpdateDTO.certificado_antecedentes = licenciasChoferesUpdateDTO.certificado_antecedentes?.toLocaleUpperCase().trim();
    licenciasChoferesUpdateDTO.seguro_accidentes_personales = licenciasChoferesUpdateDTO.seguro_accidentes_personales?.toLocaleUpperCase().trim();
    licenciasChoferesUpdateDTO.motivo_baja = licenciasChoferesUpdateDTO.motivo_baja?.toLocaleUpperCase().trim();

    await this.licenciasChoferesRepository.update({ id }, licenciasChoferesUpdateDTO);
    return this.getId(id);
    
  }

}
