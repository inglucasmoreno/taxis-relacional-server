import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Personas } from './entities';

@Injectable()
export class PersonasService {

  constructor(
    @InjectRepository(Personas) private readonly personasRepository: Repository<Personas>
  ) { }

  // Personas por ID
  async getId(id: number): Promise<Personas> {

    const personas = await this.personasRepository.findOne({ relations: ['licencia_chofer', 'licencia_permisionario','creatorUser', 'updatorUser'] ,where: { id } });
    if (!personas) throw new NotFoundException('La persona no existe');
    return personas;

  }

  // Listar todas las personas
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
    let campos = ['apellido', 'nombre', 'dni'];

    campos.forEach(campo => {
      const filtro = {};
      filtro[campo] = Like('%' + parametro.toUpperCase() + '%');
      if (activo.trim() !== '') filtro['activo'] = activo === 'true' ? true : false;
      where.push(filtro)
    })

    const totalItems = await this.personasRepository.count({ where });

    const personas = await this.personasRepository
      .find({
        relations: ['licencia_chofer', 'licencia_permisionario', 'creatorUser', 'updatorUser'],
        order,
        skip: Number(desde),
        take: Number(cantidadItems),
        where
      });

    return {
      personas,
      totalItems
    };

  }

  // Crear persona
  async insert(personasDTO: any): Promise<Personas[]> {

    // Uppercase y Lowercase
    personasDTO.apellido = personasDTO.apellido.toLocaleUpperCase().trim();
    personasDTO.nombre = personasDTO.nombre.toLocaleUpperCase().trim();
    personasDTO.domicilio = personasDTO.domicilio.toLocaleUpperCase().trim();
    personasDTO.mail = personasDTO.mail.toLocaleLowerCase().trim();

    const { dni } = personasDTO;

    // Verificacion: DNI Repetido
    let personaDB = await this.personasRepository.findOneBy({ dni });
    if (personaDB) throw new NotFoundException('El DNI ya se encuentra cargado');

    const nuevaPersona = await this.personasRepository.create(personasDTO);
    return this.personasRepository.save(nuevaPersona);

  }

  // Actualizar persona
  async update(id: number, personasUpdateDTO: any): Promise<any> {

    const { dni, apellido, nombre, domicilio, mail } = personasUpdateDTO;

    const personaDB = await this.personasRepository.findOneBy({ id });

    // Verificacion: La persona no existe
    if (!personaDB) throw new NotFoundException('La persona no existe');

    // Verificacion: dni repetido
    if (dni) {
      const nuevoDni = await this.personasRepository.findOneBy({ dni: dni.trim() })
      if (nuevoDni && nuevoDni.id !== id) throw new NotFoundException('El DNI ya se encuentra cargado');
    }

    personasUpdateDTO.apellido = apellido?.toLocaleUpperCase();
    personasUpdateDTO.nombre = nombre?.toLocaleUpperCase();
    personasUpdateDTO.domicilio = domicilio?.toLocaleUpperCase();
    personasUpdateDTO.mail = mail?.toLocaleLowerCase();

    await this.personasRepository.update({ id }, personasUpdateDTO);
    return this.getId(id);

  }


}
