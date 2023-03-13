import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personas } from '../personas/entities';
import axios from 'axios';

@Injectable()
export class SigemService {

  constructor(
    @InjectRepository(Personas) private readonly personasRepository: Repository<Personas>,
  ) { };

  // Autenticacion
  async autenticacion(): Promise<any> {

    const respuesta = await axios.post('https://sigem.sanluislaciudad.gob.ar/sigem/comunicacionExterna/login', {},{
      headers: {
        username: process.env.SIGEM_USUARIO || '',
        password: process.env.SIGEM_PASSWORD || ''   
      }
    });

    return respuesta.data;

  }
  
  // Persona por DNI
  async getPersona(data: any): Promise<any> {

    const { dni, creatorUser, updatorUser } = data;

    const dataAuthentication = await this.autenticacion();
    
    const respuesta: any = await axios.post('https://sigem.sanluislaciudad.gob.ar/sigem/comunicacionExterna/getInfoPersona', { dni: Number(dni) },
    { headers: { accesstoken: dataAuthentication.accesstoken } });

    let persona: any = null;
    let success: boolean = false;

    if(respuesta.data.success){ // SIGEM - RESPUESTA CORRECTA
  
    
      // const personaDB = await this.personasModel.findOne({ dni });
      const personaDB = await this.personasRepository.findOne({ where: { dni } });  
      
      success = true;

      if(personaDB){ // Actualizar datos
        
        const dataUpdate = {
          apellido: respuesta.data.informacion.apellido,
          nombre: respuesta.data.informacion.nombre,
          dni: respuesta.data.informacion.dni,
          domicilio: respuesta.data.informacion.domicilio,
          telefono: respuesta.data.informacion.telefno,
          mail: respuesta.data.informacion.mail,
          sigem: true,
          updatorUser: data.updatorUser,
        }

        await this.personasRepository.update({ dni }, dataUpdate);
        persona = await this.personasRepository.findOne({ where: { dni } });

      }else{ // Se crea el usuario en el sistema

        const dataCreator = {
          ...respuesta.data.informacion,
          sigem: true,
          creatorUser,
          updatorUser
        }

        const nuevaPersona = await this.personasRepository.create(dataCreator);
        persona = this.personasRepository.save(nuevaPersona);
        
      }

    } else {  // SIGEM - RESPUESTA INCORRECTA

      persona = await this.personasRepository.findOne({ where: { dni } });  
      if(persona) success = true;
    
    }

    // return respuesta.data;

    return {
      persona,
      success
    }

  } 

}
