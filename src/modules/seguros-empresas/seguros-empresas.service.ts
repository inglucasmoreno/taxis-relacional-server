import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SegurosEmpresas } from './entities';

@Injectable()
export class SegurosEmpresasService {

  constructor(
    @InjectRepository(SegurosEmpresas) private readonly segurosEmpresasRepository: Repository<SegurosEmpresas>
  ) { }

  // Empresa por ID
  async getId(id: number): Promise<SegurosEmpresas> {

    const empresa = await this.segurosEmpresasRepository.findOne({ relations: ['creatorUser', 'updatorUser'], where:{ id } });
    if (!empresa) throw new NotFoundException('El color no existe');
    return empresa;
  
  }
  
  // Listar todos las empresas
  async getAll({ columna, direccion }: any): Promise<SegurosEmpresas[]> {

    let order = {};
    order[columna] = Number(direccion);

    const empresas = await this.segurosEmpresasRepository.find({ relations: ['creatorUser', 'updatorUser'], order });

    return empresas;

  }

  // Crear empresa
  async insert(segurosEmpresasDTO: any): Promise<SegurosEmpresas[]> {
    
    // Uppercase
    segurosEmpresasDTO.descripcion = segurosEmpresasDTO.descripcion.toLocaleUpperCase().trim();
    segurosEmpresasDTO.direccion = segurosEmpresasDTO.direccion.toLocaleUpperCase().trim();
    
    const { descripcion } = segurosEmpresasDTO;
    
    // Verificacion: Descripcion repetida
    let empresaDB = await this.segurosEmpresasRepository.findOneBy({ descripcion });
    if (empresaDB) throw new NotFoundException('La empresa ya se encuentra cargada');

    const nuevaEmpresa = await this.segurosEmpresasRepository.create(segurosEmpresasDTO);
    return this.segurosEmpresasRepository.save(nuevaEmpresa);

  }

  // Actualizar empresa
  async update(id: number, segurosEmpresasUpdateDTO: any): Promise<any> {

    const { descripcion, direccion } = segurosEmpresasUpdateDTO;

    const empresaDB = await this.segurosEmpresasRepository.findOneBy({ id });

    // Verificacion: La empresa no existe
    if (!empresaDB) throw new NotFoundException('La empresa no existe');

    // Verificacion: descripcion repetida
    if (descripcion) {
        const empresaDescripcion = await this.segurosEmpresasRepository.findOneBy({ descripcion: descripcion.trim().toUpperCase() })
        if (empresaDescripcion && empresaDescripcion.id !== id) throw new NotFoundException('La empresa ya se encuentra cargada');
    }

    if(descripcion) segurosEmpresasUpdateDTO.descripcion = descripcion.toLocaleUpperCase();
    if(direccion) segurosEmpresasUpdateDTO.direccion = direccion.toLocaleUpperCase();

    await this.segurosEmpresasRepository.update({ id }, segurosEmpresasUpdateDTO);
    return this.getId(id);
    
  }


}
