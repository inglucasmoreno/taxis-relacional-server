import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Vehiculos } from './entities';

@Injectable()
export class VehiculosService {

  constructor(
    @InjectRepository(Vehiculos) private readonly vehiculosRepository: Repository<Vehiculos>
  ) { }

  // Vehiculo por ID
  async getId(id: number): Promise<Vehiculos> {

    const vehiculo = await this.vehiculosRepository.findOne({ relations: [
      'marca', 
      'modelo', 
      'color', 
      'seguro', 
      'seguro.empresa',
      'creatorUser',
      'updatorUser',
    ], where: { id } });
    if (!vehiculo) throw new NotFoundException('El vehiculo no existe');
    return vehiculo;

  }

  // Listar todos los vehiculos
  async getAll({
    columna,
    direccion,
    activo,
    parametro,
    desde,
    cantidadItems
  }: any): Promise<any> {

    // Ordenando datos
    let order = {};
    order[columna] = Number(direccion);

    // Filtrando datos
    let where = [];

    // Filtrado por patente
    where.push({ patente: Like('%' + parametro.toUpperCase() + '%') });
    
    // Filtrado por marca
    where.push({
      marca: {
        descripcion: Like('%' + parametro.toUpperCase() + '%')
      }
    });
    
    // Filtrado por modelo 
    where.push({
      modelo: {
        descripcion: Like('%' + parametro.toUpperCase() + '%')
      }
    });

    // Filtrado por color
    where.push({
      color: {
        descripcion: Like('%' + parametro.toUpperCase() + '%')
      }
    });

    const totalItems = await this.vehiculosRepository.count({ where});

    const vehiculos = await this.vehiculosRepository
      .find({
        relations: [
          'marca', 
          'modelo', 
          'color', 
          'seguro', 
          'seguro.empresa',
          'creatorUser',
          'updatorUser',
        ],
        order,
        skip: Number(desde),
        take: Number(cantidadItems),
        where
      });

    return {
      vehiculos,
      totalItems
    };

  }

  // Crear vehiculo
  async insert(vehiculosDTO: any): Promise<Vehiculos[]> {

    // Uppercase
    vehiculosDTO.patente = vehiculosDTO.patente.toLocaleUpperCase().trim();

    const { patente } = vehiculosDTO;

    // Verificacion: Patente repetida
    let vehiculoDB = await this.vehiculosRepository.findOneBy({ patente });
    if (vehiculoDB) throw new NotFoundException('La patente ya se encuentra cargada');

    const nuevoVehiculo = await this.vehiculosRepository.create(vehiculosDTO);
    return this.vehiculosRepository.save(nuevoVehiculo);

  }

  // Actualizar vehiculo
  async update(id: number, vehiculosUpdateDTO: any): Promise<any> {

    const { patente } = vehiculosUpdateDTO;

    const vehiculoDB = await this.vehiculosRepository.findOneBy({ id });

    // Verificacion: El vehiculo no existe
    if (!vehiculoDB) throw new NotFoundException('El vehiculo no existe');

    // Verificacion: patente repetida
    if (patente) {
      const nuevaPatente = await this.vehiculosRepository.findOneBy({ patente: patente.trim().toUpperCase() })
      if (nuevaPatente && nuevaPatente.id !== id) throw new NotFoundException('La patente ya se encuentra cargada');
    }

    if (patente) vehiculosUpdateDTO.patente = patente.toLocaleUpperCase();

    await this.vehiculosRepository.update({ id }, vehiculosUpdateDTO);
    return this.getId(id);

  }

}
