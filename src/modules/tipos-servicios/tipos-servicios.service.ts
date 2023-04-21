import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposServicios } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class TiposServiciosService {

  constructor(
    @InjectRepository(TiposServicios) private readonly tiposServiciosRepository: Repository<TiposServicios>
  ) { }

  // Tipo de servicio por ID
  async getId(id: number): Promise<TiposServicios> {
    const tipo = await this.tiposServiciosRepository.findOne({ relations: ['creatorUser', 'updatorUser'] ,where:{ id } });
    if (!tipo) throw new NotFoundException('El tipo de servicio no existe');
    return tipo;
  }
  
  // Listar todos los tipos de servicio
  async getAll({ columna = 'descripcion', direccion = 1 }: any): Promise<TiposServicios[]> {

    let order = {};
    order[columna] = Number(direccion);

    const tipos = await this.tiposServiciosRepository.find({ relations: ['creatorUser', 'updatorUser'], order });

    return tipos;

  }

  // Crear tipo
  async insert(tiposServiciosDTO: any): Promise<TiposServicios[]> {
    
    // Uppercase
    tiposServiciosDTO.descripcion = tiposServiciosDTO.descripcion.toLocaleUpperCase().trim();
    
    const { descripcion } = tiposServiciosDTO;
    
    // Verificacion: Descripcion repetida
    let tipoDB = await this.tiposServiciosRepository.findOneBy({ descripcion });
    if (tipoDB) throw new NotFoundException('El tipo de servicio ya se encuentra cargado');

    const nuevoTipo = await this.tiposServiciosRepository.create(tiposServiciosDTO);
    return this.tiposServiciosRepository.save(nuevoTipo);

  }

  // Actualizar tipo
  async update(id: number, tiposServiciosUpdateDTO: any): Promise<any> {

    const { descripcion } = tiposServiciosUpdateDTO;

    const tipoDB = await this.tiposServiciosRepository.findOneBy({ id });

    // Verificacion: El tipo de servicio no existe
    if (!tipoDB) throw new NotFoundException('El tipo no existe');

    // Verificacion: descripcion repetida
    if (descripcion) {
        const tipoDescripcion = await this.tiposServiciosRepository.findOneBy({ descripcion: descripcion.trim().toUpperCase() })
        if (tipoDescripcion && tipoDescripcion.id !== id) throw new NotFoundException('El tipo de servicio ya se encuentra cargado');
    }

    if(descripcion) tiposServiciosUpdateDTO.descripcion = descripcion.toLocaleUpperCase();

    await this.tiposServiciosRepository.update({ id }, tiposServiciosUpdateDTO);
    return this.getId(id);
    
  }

}
