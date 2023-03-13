import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelojesPrecintos } from './entities';

@Injectable()
export class RelojesPrecintosService {
  
  constructor(
    @InjectRepository(RelojesPrecintos) private readonly relojesPrecintosRepository: Repository<RelojesPrecintos>
  ) { }

  // Precinto por ID
  async getId(id: number): Promise<RelojesPrecintos> {

    const precinto = await this.relojesPrecintosRepository.findOne({ relations: ['motivo'], where: { id } });
    if (!precinto) throw new NotFoundException('El precinto no existe');
    return precinto;

  }

  // Listar todos los precintos
  async getAll({ columna, direccion }: any): Promise<RelojesPrecintos[]> {

    let order = {};
    order[columna] = direccion;

    let parametros: any = { order };

    const precintos = await this.relojesPrecintosRepository.find({ relations: ['motivo'] });

    return precintos;

  }

  // Crear precinto
  async insert(relojesPrecintosDTO: any): Promise<RelojesPrecintos[]> {

    // Uppercase
    relojesPrecintosDTO.nro_precinto = relojesPrecintosDTO.nro_precinto.toLocaleUpperCase().trim();

    const { nro_precinto } = relojesPrecintosDTO;

    // Verificacion: Nro precinto repetido
    let precintoDB = await this.relojesPrecintosRepository.findOneBy({ nro_precinto });
    if (precintoDB) throw new NotFoundException('El número de precinto ya se encuentra cargado');

    const nuevoPrecinto = await this.relojesPrecintosRepository.create(relojesPrecintosDTO);
    return this.relojesPrecintosRepository.save(nuevoPrecinto);

  }

  // Actualizar precinto
  async update(id: number, relojesPrecintosUpdateDTO: any): Promise<any> {

    const { nro_precinto } = relojesPrecintosUpdateDTO;

    const precintoDB = await this.relojesPrecintosRepository.findOneBy({ id });

    // Verificacion: El modelo no existe
    if (!precintoDB) throw new NotFoundException('El precinto no existe');

    // Verificacion: Nro de precinto repetido
    if (nro_precinto) {
      const precintoNro = await this.relojesPrecintosRepository.findOneBy({ nro_precinto: nro_precinto.trim().toUpperCase() })
      if (precintoNro && precintoNro.id !== id) throw new NotFoundException('El número de precinto ya se encuentra cargado');
    }

    if (nro_precinto) relojesPrecintosUpdateDTO.nro_precinto = nro_precinto.toLocaleUpperCase();

    await this.relojesPrecintosRepository.update({ id }, relojesPrecintosUpdateDTO);
    return this.getId(id);

  }


}
