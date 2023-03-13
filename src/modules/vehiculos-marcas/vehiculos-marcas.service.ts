import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculosMarcas } from './entities';

@Injectable()
export class VehiculosMarcasService {

  constructor(
    @InjectRepository(VehiculosMarcas) private readonly vehiculosMarcasRepository: Repository<VehiculosMarcas>
  ) { }

  // Marca por ID
  async getId(id: number): Promise<VehiculosMarcas> {

    const marca = await this.vehiculosMarcasRepository.findOne({ relations: ['creatorUser', 'updatorUser'], where: { id } });
    if (!marca) throw new NotFoundException('La marca no existe');
    return marca;

  }

  // Listar todas las marcas
  async getAll({ columna, direccion }: any): Promise<VehiculosMarcas[]> {

    let order = {};
    order[columna] = Number(direccion);

    const marcas = await this.vehiculosMarcasRepository.find({ relations: ['creatorUser', 'updatorUser'], order });

    return marcas;

  }

  // Crear marca
  async insert(vehiculosMarcasDTO: any): Promise<VehiculosMarcas[]> {

    // Uppercase
    vehiculosMarcasDTO.descripcion = vehiculosMarcasDTO.descripcion.toLocaleUpperCase().trim();

    const { descripcion } = vehiculosMarcasDTO;

    // Verificacion: Descripcion repetida
    let marcaDB = await this.vehiculosMarcasRepository.findOneBy({ descripcion });
    if (marcaDB) throw new NotFoundException('La marca ya se encuentra cargado');

    const nuevaMarca = await this.vehiculosMarcasRepository.create(vehiculosMarcasDTO);
    return this.vehiculosMarcasRepository.save(nuevaMarca);

  }

  // Actualizar marca
  async update(id: number, vehiculosMarcasUpdateDTO: any): Promise<any> {

    console.log(vehiculosMarcasUpdateDTO);

    const { descripcion } = vehiculosMarcasUpdateDTO;

    const marcaDB = await this.vehiculosMarcasRepository.findOneBy({ id });

    // Verificacion: La marca no existe
    if (!marcaDB) throw new NotFoundException('La marca no existe');

    // Verificacion: descripcion repetida
    if (descripcion) {
      const marcaDescripcion = await this.vehiculosMarcasRepository.findOneBy({ descripcion: descripcion.trim().toUpperCase() })
      if (marcaDescripcion && marcaDescripcion.id !== id) throw new NotFoundException('La marca ya se encuentra cargado');
    }

    if (descripcion) vehiculosMarcasUpdateDTO.descripcion = descripcion.toLocaleUpperCase();

    await this.vehiculosMarcasRepository.update({ id }, vehiculosMarcasUpdateDTO);
    return this.getId(id);

  }

}
