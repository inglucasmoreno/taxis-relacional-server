import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculosColores } from './entities';

@Injectable()
export class VehiculosColoresService {

  constructor(
    @InjectRepository(VehiculosColores) private readonly vehiculosColoresRepository: Repository<VehiculosColores>
  ) { }

  // Color por ID
  async getId(id: number): Promise<VehiculosColores> {
    const color = await this.vehiculosColoresRepository.findOne({ relations: ['creatorUser', 'updatorUser'] ,where:{ id } });
    if (!color) throw new NotFoundException('El color no existe');
    return color;
  }
  
  // Listar todos los colores
  async getAll({ columna, direccion }: any): Promise<VehiculosColores[]> {

    let order = {};
    order[columna] = Number(direccion);

    const colores = await this.vehiculosColoresRepository.find({ relations: ['creatorUser', 'updatorUser'], order });

    return colores;

  }

  // Crear color
  async insert(vehiculosColoresDTO: any): Promise<VehiculosColores[]> {
    
    // Uppercase
    vehiculosColoresDTO.descripcion = vehiculosColoresDTO.descripcion.toLocaleUpperCase().trim();
    
    const { descripcion } = vehiculosColoresDTO;
    
    // Verificacion: Descripcion repetida
    let colorDB = await this.vehiculosColoresRepository.findOneBy({ descripcion });
    if (colorDB) throw new NotFoundException('El color ya se encuentra cargado');

    const nuevoColor = await this.vehiculosColoresRepository.create(vehiculosColoresDTO);
    return this.vehiculosColoresRepository.save(nuevoColor);

  }

  // Actualizar color
  async update(id: number, vehiculosColoresUpdateDTO: any): Promise<any> {

    const { descripcion } = vehiculosColoresUpdateDTO;

    const colorDB = await this.vehiculosColoresRepository.findOneBy({ id });

    // Verificacion: El color no existe
    if (!colorDB) throw new NotFoundException('El color no existe');

    // Verificacion: descripcion repetida
    if (descripcion) {
        const colorDescripcion = await this.vehiculosColoresRepository.findOneBy({ descripcion: descripcion.trim().toUpperCase() })
        if (colorDescripcion && colorDescripcion.id !== id) throw new NotFoundException('El color ya se encuentra cargado');
    }

    if(descripcion) vehiculosColoresUpdateDTO.descripcion = descripcion.toLocaleUpperCase();

    await this.vehiculosColoresRepository.update({ id }, vehiculosColoresUpdateDTO);
    return this.getId(id);
    
  }

}
