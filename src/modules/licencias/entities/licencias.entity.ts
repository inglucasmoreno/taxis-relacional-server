import { LicenciasChoferes } from "src/modules/licencias-choferes/entities";
import { LicenciasPermisionarios } from "src/modules/licencias-permisionario/entities/licencias-permisionarios.entity";
import { LicenciasVehiculos } from "src/modules/licencias-vehiculos/entities";
import { TiposServicios } from "src/modules/tipos-servicios/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Licencias {

  @PrimaryGeneratedColumn('increment')
  id: number;  

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 50
   })
  nro_licencia: string;

  @Column({ 
    default: 'Habilitada',
    type: 'varchar',
    length: 100
   })
  estado: string;
  
  @Column({ default: true })
  activo: boolean;
   
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TiposServicios, tipo_servicio => tipo_servicio.licencias)
  @JoinColumn({ name: 'tipo_servicio_id' })
  tipo_servicio: TiposServicios

  @OneToMany(() => LicenciasChoferes, licencia_chofer => licencia_chofer.licencia)
  licencia_chofer: LicenciasChoferes[]

  @OneToMany(() => LicenciasVehiculos, licencia_vehiculo => licencia_vehiculo.licencia)
  licencia_vehiculo: LicenciasVehiculos[]

  @OneToMany(() => LicenciasPermisionarios, licencia_permisionario => licencia_permisionario.licencia)
  licencia_permisionario: LicenciasPermisionarios[]

  @ManyToOne(() => Usuarios, usuario => usuario.licencias)
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.licencias)
  updatorUser: Usuarios;

}