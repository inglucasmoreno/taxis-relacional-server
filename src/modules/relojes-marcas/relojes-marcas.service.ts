import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelojesMarcas } from './entities';

@Injectable()
export class RelojesMarcasService {

  constructor(
    @InjectRepository(RelojesMarcas) private readonly relojesMarcasRepository: Repository<RelojesMarcas>
  ) { }

  // Marca por ID
  async getId(id: number): Promise<RelojesMarcas> {

    const marca = await this.relojesMarcasRepository.findOne({ relations: ['creatorUser','updatorUser'], where: { id } });
    if (!marca) throw new NotFoundException('La marca no existe');
    return marca;
  
  }
  
  // Listar marcas
  async getAll({ columna, direccion }: any): Promise<RelojesMarcas[]> {

    let order = {};
    order[columna] = Number(direccion);

    const marcas = await this.relojesMarcasRepository.find({ relations: ['creatorUser','updatorUser'], order });
    
    return marcas;

  }

  // Crear marca
  async insert(relojesMarcasDTO: any): Promise<RelojesMarcas[]> {
    
    // Uppercase
    relojesMarcasDTO.descripcion = relojesMarcasDTO.descripcion.toLocaleUpperCase().trim();
    
    const { descripcion } = relojesMarcasDTO;
    
    // Verificacion: Descripcion repetida
    let marcaDB = await this.relojesMarcasRepository.findOneBy({ descripcion });
    if (marcaDB) throw new NotFoundException('La marca ya se encuentra cargado');

    const nuevaMarca = await this.relojesMarcasRepository.create(relojesMarcasDTO);
    return this.relojesMarcasRepository.save(nuevaMarca);

  }

  // Actualizar marca
  async update(id: number, relojesMarcasUpdateDTO: any): Promise<any> {

    const { descripcion } = relojesMarcasUpdateDTO;

    const marcaDB = await this.relojesMarcasRepository.findOneBy({ id });

    // Verificacion: La marca no existe
    if (!marcaDB) throw new NotFoundException('La marca no existe');

    // Verificacion: descripcion repetida
    if (descripcion) {
        const marcaDescripcion = await this.relojesMarcasRepository.findOneBy({ descripcion: descripcion.trim().toUpperCase() })
        if (marcaDescripcion && marcaDescripcion.id !== id) throw new NotFoundException('La marca ya se encuentra cargada');
    }

    if(descripcion) relojesMarcasUpdateDTO.descripcion = descripcion.toLocaleUpperCase();

    await this.relojesMarcasRepository.update({ id }, relojesMarcasUpdateDTO);
    return this.getId(id);
    
  }

}
