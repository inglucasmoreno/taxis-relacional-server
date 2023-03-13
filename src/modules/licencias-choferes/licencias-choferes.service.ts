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
    order[columna] = direccion;

    let parametros: any = { order };

    const relaciones = await this.licenciasChoferesRepository.find({ relations: ['licencia', 'persona', 'creatorUser', 'updatorUser'] });

    return relaciones;

  }

  // Crear relacion
  async insert(licenciasChoferesDTO: any): Promise<LicenciasChoferes[]> {
        
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
