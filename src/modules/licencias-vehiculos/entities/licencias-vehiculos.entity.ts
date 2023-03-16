import { Licencias } from "src/modules/licencias/entities";
import { Personas } from "src/modules/personas/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { Vehiculos } from "src/modules/vehiculos/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class LicenciasVehiculos {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    default: new Date()
  })
  fecha_alta: Date;

  @Column({
    default: new Date()
  })
  fecha_baja: Date;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  expediente: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  libreta_deuda_jf_anterior: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  libreta_deuda_jf_nuevo: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  sellado_control_tecnico: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  sellado_desinfeccion: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  foto_libre_deuda_rentas: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  foto_libre_deuda_comercio: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  sellado_transferencia: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Vehiculos, vehiculo => vehiculo.licencia_vehiculo)
  @JoinColumn({ name: 'vehiculo_id' })
  vehiculo: Vehiculos

  @ManyToOne(() => Licencias, licencia => licencia.licencia_vehiculo)
  @JoinColumn({ name: 'licencia_id' })
  licencia: Licencias

  @ManyToOne(() => Usuarios, usuario => usuario.licencias_vehiculos)
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.licencias_vehiculos)
  updatorUser: Usuarios;

}