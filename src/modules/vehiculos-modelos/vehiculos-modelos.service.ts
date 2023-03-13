import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculosModelos } from './entities';

@Injectable()
export class VehiculosModelosService {

  constructor(
    @InjectRepository(VehiculosModelos) private readonly vehiculosModelosRepository: Repository<VehiculosModelos>
  ) { }

  // Modelo por ID
  async getId(id: number): Promise<VehiculosModelos> {

    const modelo = await this.vehiculosModelosRepository.findOne({ relations: ['creatorUser', 'updatorUser'], where: { id } });
    if (!modelo) throw new NotFoundException('El modelo no existe');
    return modelo;

  }

  // Listar todos los modelos
  async getAll({ columna, direccion, marca }: any): Promise<VehiculosModelos[]> {

    let order = {};
    order[columna] = Number(direccion);

    const modelos = await this.vehiculosModelosRepository
                              .find({ 
                                relations: ['creatorUser', 'updatorUser'],
                                order, 
                                where: { marca: { id: marca } } 
                              });

    return modelos;

  }

  // Crear modelo
  async insert(vehiculosModelosDTO: any): Promise<VehiculosModelos[]> {

    // Uppercase
    vehiculosModelosDTO.descripcion = vehiculosModelosDTO.descripcion.toLocaleUpperCase().trim();

    const { descripcion } = vehiculosModelosDTO;

    // Verificacion: Descripcion repetida
    let modeloDB = await this.vehiculosModelosRepository.findOneBy({ descripcion });
    if (modeloDB) throw new NotFoundException('El modelo ya se encuentra cargado');

    const nuevoModelo = await this.vehiculosModelosRepository.create(vehiculosModelosDTO);
    return this.vehiculosModelosRepository.save(nuevoModelo);

  }

  // Actualizar modelo
  async update(id: number, vehiculosModelosUpdateDTO: any): Promise<any> {

    const { descripcion } = vehiculosModelosUpdateDTO;

    const modeloDB = await this.vehiculosModelosRepository.findOneBy({ id });

    // Verificacion: El modelo no existe
    if (!modeloDB) throw new NotFoundException('El modelo no existe');

    // Verificacion: descripcion repetida
    if (descripcion) {
      const modeloDescripcion = await this.vehiculosModelosRepository.findOneBy({ descripcion: descripcion.trim().toUpperCase() })
      if (modeloDescripcion && modeloDescripcion.id !== id) throw new NotFoundException('El modelo ya se encuentra cargado');
    }

    if (descripcion) vehiculosModelosUpdateDTO.descripcion = descripcion.toLocaleUpperCase();

    await this.vehiculosModelosRepository.update({ id }, vehiculosModelosUpdateDTO);
    return this.getId(id);

  }


}
