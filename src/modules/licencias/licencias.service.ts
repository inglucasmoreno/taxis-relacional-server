import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Licencias } from './entities';

@Injectable()
export class LicenciasService {

  constructor(
    @InjectRepository(Licencias) private readonly licenciasRepository: Repository<Licencias>
  ) { }

  // Licencia por ID
  async getId(id: number): Promise<Licencias> {

    const licencia = await this.licenciasRepository.findOne({ relations: ['licencia_chofer', 'licencia_permisionario', 'creatorUser', 'updatorUser'], where: { id } });
    if (!licencia) throw new NotFoundException('La licencia no existe');
    return licencia;

  }

  // Listar todas las licencias
  async getAll({ columna, direccion }: any): Promise<Licencias[]> {

    let order = {};
    order[columna] = direccion;

    let parametros: any = { order };

    const licencias = await this.licenciasRepository.find({ relations: ['licencia_chofer', 'licencia_permisionario', 'creatorUser', 'updatorUser'] });

    return licencias;

  }

  // Crear licencia
  async insert(licenciasDTO: any): Promise<Licencias[]> {

    // Uppercase
    licenciasDTO.estado = licenciasDTO.estado?.toLocaleUpperCase().trim();

    const { nro_licencia } = licenciasDTO;

    // Verificacion: Nro de licencia repetido
    let licenciaDB = await this.licenciasRepository.findOneBy({ nro_licencia });
    if (licenciaDB) throw new NotFoundException('La licencia ya se encuentra cargada');

    const nuevaLicencia = await this.licenciasRepository.create(licenciasDTO);
    return this.licenciasRepository.save(nuevaLicencia);

  }

  // Actualizar licencia
  async update(id: number, licenciasUpdateDTO: any): Promise<any> {

    const { nro_licencia } = licenciasUpdateDTO;

    const licenciaDB = await this.licenciasRepository.findOneBy({ id });

    // Verificacion: La licencia no existe
    if (!licenciaDB) throw new NotFoundException('La licencia no existe');

    // Verificacion: Nro de licencia repetida
    if (nro_licencia) {
      const licenciaNroRepetido = await this.licenciasRepository.findOneBy({ nro_licencia: nro_licencia.trim() })
      if (licenciaNroRepetido && licenciaNroRepetido.id !== id) throw new NotFoundException('Le número de licencia ya se encuentra cargado');
    }

    if (nro_licencia) licenciasUpdateDTO.nro_licencia = nro_licencia.toLocaleUpperCase();

    await this.licenciasRepository.update({ id }, licenciasUpdateDTO);
    return this.getId(id);

  }

}
