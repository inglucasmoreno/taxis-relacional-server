import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelojesPrecintosMotivos } from './entities';

@Injectable()
export class RelojesPrecintosMotivosService {

  constructor(
    @InjectRepository(RelojesPrecintosMotivos) private readonly relojesPrecintosMotivosRepository: Repository<RelojesPrecintosMotivos>
  ) { }

  // Motivo por ID
  async getId(id: number): Promise<RelojesPrecintosMotivos> {

    const motivo = await this.relojesPrecintosMotivosRepository.findOne({ relations: ['creatorUser', 'updatorUser'], where: { id } });
    if (!motivo) throw new NotFoundException('El motivo no existe');
    return motivo;

  }

  // Listar todos los motivos
  async getAll({ columna, direccion }: any): Promise<RelojesPrecintosMotivos[]> {

    let order = {};
    order[columna] = Number(direccion);

    const motivos = await this.relojesPrecintosMotivosRepository.find({ relations: ['creatorUser', 'updatorUser'], order });

    return motivos;

  }

  // Crear motivo
  async insert(relojesPrecintosMotivosDTO: any): Promise<RelojesPrecintosMotivos[]> {

    // Uppercase
    relojesPrecintosMotivosDTO.descripcion = relojesPrecintosMotivosDTO.descripcion.toLocaleUpperCase().trim();

    const { descripcion } = relojesPrecintosMotivosDTO;

    // Verificacion: Descripcion repetida
    let motivoDB = await this.relojesPrecintosMotivosRepository.findOneBy({ descripcion });
    if (motivoDB) throw new NotFoundException('El motivo ya se encuentra cargado');

    const nuevoMotivo = await this.relojesPrecintosMotivosRepository.create(relojesPrecintosMotivosDTO);
    return this.relojesPrecintosMotivosRepository.save(nuevoMotivo);

  }

  // Actualizar modelo
  async update(id: number, relojesPrecintosMotivosUpdateDTO: any): Promise<any> {

    const { descripcion } = relojesPrecintosMotivosUpdateDTO;

    const motivoDB = await this.relojesPrecintosMotivosRepository.findOneBy({ id });

    // Verificacion: El modelo no existe
    if (!motivoDB) throw new NotFoundException('El motivo no existe');

    // Verificacion: descripcion repetida
    if (descripcion) {
      const motivoDescripcion = await this.relojesPrecintosMotivosRepository.findOneBy({ descripcion: descripcion.trim().toUpperCase() })
      if (motivoDescripcion && motivoDescripcion.id !== id) throw new NotFoundException('El motivo ya se encuentra cargado');
    }

    if (descripcion) relojesPrecintosMotivosUpdateDTO.descripcion = descripcion.toLocaleUpperCase();

    await this.relojesPrecintosMotivosRepository.update({ id }, relojesPrecintosMotivosUpdateDTO);
    return this.getId(id);

  }

}
