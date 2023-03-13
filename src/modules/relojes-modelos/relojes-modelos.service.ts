import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelojesModelos } from './entities';

@Injectable()
export class RelojesModelosService {

  constructor(
    @InjectRepository(RelojesModelos) private readonly relojesModelosRepository: Repository<RelojesModelos>
  ) { }

  // Modelo por ID
  async getId(id: number): Promise<RelojesModelos> {

    const modelo = await this.relojesModelosRepository.findOne({ relations: ['creatorUser', 'updatorUser'], where: { id } });
    if (!modelo) throw new NotFoundException('El modelo no existe');
    return modelo;

  }

  // Listar todos los modelos
  async getAll({ columna, direccion, marca }: any): Promise<RelojesModelos[]> {

    let order = {};
    order[columna] = Number(direccion);

    const modelos = await this.relojesModelosRepository
                              .find({ 
                                relations: ['creatorUser', 'updatorUser'],
                                order, 
                                where: { marca: { id: marca } } 
                              });

    return modelos;

  }

  // Crear modelo
  async insert(relojesModelosDTO: any): Promise<RelojesModelos[]> {

    // Uppercase
    relojesModelosDTO.descripcion = relojesModelosDTO.descripcion.toLocaleUpperCase().trim();

    const { descripcion } = relojesModelosDTO;

    // Verificacion: Descripcion repetida
    let modeloDB = await this.relojesModelosRepository.findOneBy({ descripcion });
    if (modeloDB) throw new NotFoundException('El modelo ya se encuentra cargado');

    const nuevoModelo = await this.relojesModelosRepository.create(relojesModelosDTO);
    return this.relojesModelosRepository.save(nuevoModelo);

  }

  // Actualizar modelo
  async update(id: number, relojesModelosUpdateDTO: any): Promise<any> {

    const { descripcion } = relojesModelosUpdateDTO;

    const modeloDB = await this.relojesModelosRepository.findOneBy({ id });

    // Verificacion: El modelo no existe
    if (!modeloDB) throw new NotFoundException('El modelo no existe');

    // Verificacion: descripcion repetida
    if (descripcion) {
      const modeloDescripcion = await this.relojesModelosRepository.findOneBy({ descripcion: descripcion.trim().toUpperCase() })
      if (modeloDescripcion && modeloDescripcion.id !== id) throw new NotFoundException('El modelo ya se encuentra cargado');
    }

    if (descripcion) relojesModelosUpdateDTO.descripcion = descripcion.toLocaleUpperCase();

    await this.relojesModelosRepository.update({ id }, relojesModelosUpdateDTO);
    return this.getId(id);

  }

}
