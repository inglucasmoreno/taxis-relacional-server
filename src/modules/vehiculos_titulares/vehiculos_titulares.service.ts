import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculosTitulares } from './entities';

@Injectable()
export class VehiculosTitularesService {

  constructor(
    @InjectRepository(VehiculosTitulares) private readonly vehiculosTitularesRepository: Repository<VehiculosTitulares>
  ) { }

  // Titular por ID
  async getId(id: number): Promise<VehiculosTitulares> {
    const titular = await this.vehiculosTitularesRepository.findOne({ 
      relations: {
        persona: true,
        vehiculo: true,
        creatorUser: true,
        updatorUser: true
      },
      where:{ id } 
    });
    if (!titular) throw new NotFoundException('El titular no existe');
    return titular;
  }
  
  // Listar todos los titulares
  async getAll({ columna, direccion, vehiculo }: any): Promise<VehiculosTitulares[]> {

    let order = {};
    order[columna] = Number(direccion);

    let where = [];

    if(vehiculo !== '') where.push({ vehiculo: { id: Number(vehiculo) } });

    const titulares = await this.vehiculosTitularesRepository.find({ 
      relations: {
        persona: true,
        vehiculo: true,
        creatorUser: true,
        updatorUser: true
      }, 
      order,
      where
    });

    return titulares;

  }

  // Crear titular
  async insert(vehiculosTitularesDTO: any): Promise<VehiculosTitulares[]> {
    const nuevoTitular = await this.vehiculosTitularesRepository.create(vehiculosTitularesDTO);
    return this.vehiculosTitularesRepository.save(nuevoTitular);
  }

  // Crear multiples titulares
  async multiInsert(titulares: any[]): Promise<any> {

    titulares.map( async titular => {
      
      const data = {
        numero_titulo: titular.numero_titulo,
        vehiculo: titular.vehiculo,
        persona: titular.persona,
        porcentaje: titular.porcentaje,
        fecha_inscripcion_inicial: titular.fecha_inscripcion_inicial,
        activo: true
      };

      console.log(data);

      await this.vehiculosTitularesRepository.create(data);
      await this.vehiculosTitularesRepository.save(data);
    })
  
    return 'Titulares cargados correctamente';

  }

  // Actualizar titular
  async update(id: number, vehiculosTitularesUpdateDTO: any): Promise<any> {

    const titularDB = await this.vehiculosTitularesRepository.findOneBy({ id });

    // Verificacion: El titular no existe
    if (!titularDB) throw new NotFoundException('El titular no existe');

    await this.vehiculosTitularesRepository.update({ id }, vehiculosTitularesUpdateDTO);
    return this.getId(id);
    
  }



}

