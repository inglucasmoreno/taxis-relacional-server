import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relojes } from './entities';

@Injectable()
export class RelojesService {

  constructor(
    @InjectRepository(Relojes) private readonly relojesRepository: Repository<Relojes>
  ) { }

  // Reloj por ID
  async getId(id: number): Promise<Relojes> {

    const reloj = await this.relojesRepository.findOne({ relations: ['marca', 'modelo'] ,where: { id }});
    if (!reloj) throw new NotFoundException('El reloj no existe');
    return reloj;

  }

  // Listar relojes
  async getAll({ columna, direccion }: any): Promise<Relojes[]> {

    let order = {};
    order[columna] = direccion;

    let parametros: any = { order };

    const relojes = await this.relojesRepository.find({ relations: ['marca', 'modelo'] });

    return relojes;

  }

  // Crear reloj
  async insert(relojesDTO: any): Promise<Relojes[]> {

    // Uppercase
    relojesDTO.nro_serie = relojesDTO.nro_serie.toLocaleUpperCase().trim();

    const { nro_serie } = relojesDTO;

    // Verificacion: Descripcion repetida
    let relojDB = await this.relojesRepository.findOneBy({ nro_serie });
    if (relojDB) throw new NotFoundException('El reloj ya se encuentra cargado');

    const nuevoReloj = await this.relojesRepository.create(relojesDTO);
    return this.relojesRepository.save(nuevoReloj);

  }

  // Actualizar reloj
  async update(id: number, relojesUpdateDTO: any): Promise<any> {

    const { nro_serie } = relojesUpdateDTO;

    const relojDB = await this.relojesRepository.findOneBy({ id });

    // Verificacion: El reloj no existe
    if (!relojDB) throw new NotFoundException('El reloj no existe');

    // Verificacion: nro_serie repetido
    if (nro_serie) {
      const relojNroSerie = await this.relojesRepository.findOneBy({ nro_serie: nro_serie.trim().toUpperCase() })
      if (relojNroSerie && relojNroSerie.id !== id) throw new NotFoundException('El número de serie ya se encuentra cargado');
    }

    if (nro_serie) relojesUpdateDTO.nro_serie = nro_serie.toLocaleUpperCase();

    await this.relojesRepository.update({ id }, relojesUpdateDTO);
    return this.getId(id);

  }

}
