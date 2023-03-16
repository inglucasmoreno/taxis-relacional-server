import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LicenciasVehiculos } from './entities';

@Injectable()
export class LicenciasVehiculosService {

  constructor(
    @InjectRepository(LicenciasVehiculos) private readonly licenciasVehiculosRepository: Repository<LicenciasVehiculos>
  ) { }

  // Relacion por ID
  async getId(id: number): Promise<LicenciasVehiculos> {

    const relacion = await this.licenciasVehiculosRepository.findOne({ relations: ['licencia', 'vehiculo'], where: { id } });
    if (!relacion) throw new NotFoundException('La relacion no existe');
    return relacion;
  
  }
  
  // Listar relaciones
  async getAll({ columna, direccion, licencia }: any): Promise<LicenciasVehiculos[]> {

    let order = {};
    order[columna] = direccion;

    const relaciones = await this.licenciasVehiculosRepository.find({ 
      relations: {
        vehiculo: {
          marca: true,
          modelo: true
        },
        creatorUser: true,
        updatorUser: true
      },
      order: {
        activo: -1,
        vehiculo: {
          patente: 1
        }
      },
      where: {
        licencia: { id: licencia }
      }
    });

    return relaciones;

  }

  // Crear relacion
  async insert(licenciasVehiculosDTO: any): Promise<LicenciasVehiculos[]> {
      
    const { vehiculo, licencia } = licenciasVehiculosDTO;

    // El vehiculo se encuentra asociado a otra licencia
    const altaExistente = await this.licenciasVehiculosRepository.findOne({
      relations: {
        licencia: true,
        vehiculo: {
          marca: true,
          modelo: true
        }
      },
      where: {
        vehiculo: { id: vehiculo },
        activo: true
      }
    });

    if(altaExistente) throw new NotFoundException(`El vehículo ya se encuentra asociado a la licencia ${altaExistente.licencia.nro_licencia}`);

    // Se da de baja el vehiculo actual
    await this.licenciasVehiculosRepository.update({ licencia }, { activo: false });

    // Uppercase
    licenciasVehiculosDTO.expediente = licenciasVehiculosDTO.expediente?.toLocaleUpperCase().trim();
    licenciasVehiculosDTO.libre_deuda_jf_anterior = licenciasVehiculosDTO.libre_deuda_jf_anterior?.toLocaleUpperCase().trim();
    licenciasVehiculosDTO.libre_deuda_jf_nuevo = licenciasVehiculosDTO.libre_deuda_jf_nuevo?.toLocaleUpperCase().trim();
    licenciasVehiculosDTO.sellado_control_tecnico = licenciasVehiculosDTO.sellado_control_tecnico?.toLocaleUpperCase().trim();
    licenciasVehiculosDTO.sellado_desinfeccion = licenciasVehiculosDTO.sellado_desinfeccion?.toLocaleUpperCase().trim();
    licenciasVehiculosDTO.sellado_transferencia = licenciasVehiculosDTO.sellado_transferencia?.toLocaleUpperCase().trim();
    
    const nuevaRelacion = await this.licenciasVehiculosRepository.create(licenciasVehiculosDTO);
    return this.licenciasVehiculosRepository.save(nuevaRelacion);

  }

  // Actualizar relacion
  async update(id: number, licenciasVehiculosUpdateDTO: any): Promise<any> {

    const relacionDB = await this.licenciasVehiculosRepository.findOneBy({ id });

    // Verificacion: El chofer no existe
    if (!relacionDB) throw new NotFoundException('La relacion no existe');

    // Uppercase
    licenciasVehiculosUpdateDTO.expediente = licenciasVehiculosUpdateDTO.expediente?.toLocaleUpperCase().trim();
    licenciasVehiculosUpdateDTO.libre_deuda_jf_anterior = licenciasVehiculosUpdateDTO.libre_deuda_jf_anterior?.toLocaleUpperCase().trim();
    licenciasVehiculosUpdateDTO.libre_deuda_jf_nuevo = licenciasVehiculosUpdateDTO.libre_deuda_jf_nuevo?.toLocaleUpperCase().trim();
    licenciasVehiculosUpdateDTO.sellado_control_tecnico = licenciasVehiculosUpdateDTO.sellado_control_tecnico?.toLocaleUpperCase().trim();
    licenciasVehiculosUpdateDTO.sellado_desinfeccion = licenciasVehiculosUpdateDTO.sellado_desinfeccion?.toLocaleUpperCase().trim();
    licenciasVehiculosUpdateDTO.sellado_transferencia = licenciasVehiculosUpdateDTO.sellado_transferencia?.toLocaleUpperCase().trim();

    await this.licenciasVehiculosRepository.update({ id }, licenciasVehiculosUpdateDTO);
    return this.getId(id);
    
  }


}
