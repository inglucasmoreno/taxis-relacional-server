import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LicenciasPermisionarios } from './entities';

@Injectable()
export class LicenciasPermisionarioService {

  constructor(
    @InjectRepository(LicenciasPermisionarios) private readonly licenciasPermisionariosRepository: Repository<LicenciasPermisionarios>
  ) { }

  // Relacion por ID
  async getId(id: number): Promise<LicenciasPermisionarios> {
    const relacion = await this.licenciasPermisionariosRepository.findOne({ relations: ['licencia', 'persona'], where: { id } });
    if (!relacion) throw new NotFoundException('La relacion no existe');
    return relacion;
  }
  
  // Listar relaciones
  async getAll({ columna, direccion, licencia }: any): Promise<LicenciasPermisionarios[]> {

    let order = {};
    order['activo'] = -1;
    // order[columna] = direccion;
    order['persona'] = { apellido: 1 };

    let parametros: any = { order };

    const relaciones = await this.licenciasPermisionariosRepository.find({ 
      relations: ['licencia', 'persona'],
      order, 
      where: { licencia: { id: licencia } },
      // order: { activo: -1, persona: { apellido: 1 } }
    });

    return relaciones;

  }

  // Crear relacion
  async insert(licenciasPermisionariosDTO: any): Promise<LicenciasPermisionarios[]> {
    
    const { licencia, persona } = licenciasPermisionariosDTO;

    // Se verifica si el permisionario ya esta dado de alta en esta licencia
    const altaExistente = await this.licenciasPermisionariosRepository.findOne({ 
      where: { 
        activo: true, 
        licencia: { id: licencia }, 
        persona: { id: persona } 
      } 
    });
    if(altaExistente) throw new NotFoundException('El permisionario ya esta activo en esta licencia');

    // Se da de baja el permisionario actual
    await this.licenciasPermisionariosRepository.update({ licencia }, { activo: false });

    // Uppercase
    licenciasPermisionariosDTO.expediente = licenciasPermisionariosDTO.expediente?.toLocaleUpperCase().trim();
    licenciasPermisionariosDTO.libre_deuda_jf_anterior = licenciasPermisionariosDTO.libre_deuda_jf_anterior?.toLocaleUpperCase().trim();
    licenciasPermisionariosDTO.libre_deuda_jf_nuevo = licenciasPermisionariosDTO.libre_deuda_jf_nuevo?.toLocaleUpperCase().trim();
    licenciasPermisionariosDTO.sellado_control_tecnico = licenciasPermisionariosDTO.sellado_control_tecnico?.toLocaleUpperCase().trim();
    licenciasPermisionariosDTO.sellado_desinfeccion = licenciasPermisionariosDTO.sellado_desinfeccion?.toLocaleUpperCase().trim();
    licenciasPermisionariosDTO.sellado_transferencia = licenciasPermisionariosDTO.sellado_transferencia?.toLocaleUpperCase().trim();

    // Nueva relacion
    const nuevaRelacion = await this.licenciasPermisionariosRepository.create(licenciasPermisionariosDTO);
    return this.licenciasPermisionariosRepository.save(nuevaRelacion);

  }

  // Actualizar relacion
  async update(id: number, licenciasPermisionariosUpdateDTO: any): Promise<any> {

    const relacionDB = await this.licenciasPermisionariosRepository.findOneBy({ id });

    // Verificacion: El chofer no existe
    if (!relacionDB) throw new NotFoundException('La relacion no existe');

    // Uppercase
    licenciasPermisionariosUpdateDTO.expediente = licenciasPermisionariosUpdateDTO.expediente?.toLocaleUpperCase().trim();
    licenciasPermisionariosUpdateDTO.libre_deuda_jf_anterior = licenciasPermisionariosUpdateDTO.libre_deuda_jf_anterior?.toLocaleUpperCase().trim();
    licenciasPermisionariosUpdateDTO.libre_deuda_jf_nuevo = licenciasPermisionariosUpdateDTO.libre_deuda_jf_nuevo?.toLocaleUpperCase().trim();
    licenciasPermisionariosUpdateDTO.sellado_control_tecnico = licenciasPermisionariosUpdateDTO.sellado_control_tecnico?.toLocaleUpperCase().trim();
    licenciasPermisionariosUpdateDTO.sellado_desinfeccion = licenciasPermisionariosUpdateDTO.sellado_desinfeccion?.toLocaleUpperCase().trim();
    licenciasPermisionariosUpdateDTO.sellado_transferencia = licenciasPermisionariosUpdateDTO.sellado_transferencia?.toLocaleUpperCase().trim();

    await this.licenciasPermisionariosRepository.update({ id }, licenciasPermisionariosUpdateDTO);
    return this.getId(id);
    
  }

}
