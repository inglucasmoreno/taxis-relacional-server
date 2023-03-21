import { LicenciasVehiculos } from "src/modules/licencias-vehiculos/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { VehiculosColores } from "src/modules/vehiculos-colores/entities";
import { VehiculosMarcas } from "src/modules/vehiculos-marcas/entities";
import { VehiculosModelos } from "src/modules/vehiculos-modelos/entities";
import { VehiculosSeguros } from "src/modules/vehiculos-seguros/entities";
import { VehiculosTitulares } from "src/modules/vehiculos_titulares/entities/vehiculos_titulares.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Vehiculos {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 20
  })
  patente: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: ''
  })
  motor: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: ''
  })
  chasis: string;

  @Column({
    nullable: false,
  })
  ano: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones

  @ManyToOne(() => VehiculosMarcas, marca => marca.vehiculo)
  @JoinColumn({ name: 'marca_id' })
  marca: VehiculosMarcas;

  @ManyToOne(() => VehiculosModelos, modelo => modelo.vehiculo)
  @JoinColumn({ name: 'modelo_id' })
  modelo: VehiculosModelos;

  @ManyToOne(() => VehiculosColores, color => color.vehiculo)
  @JoinColumn({ name: 'color_id' })
  color: VehiculosColores;

  @OneToMany(() => VehiculosSeguros, seguro => seguro.vehiculo)
  seguro: VehiculosSeguros[];

  @OneToMany(() => LicenciasVehiculos, licencia_vehiculo => licencia_vehiculo.vehiculo)
  licencia_vehiculo: LicenciasVehiculos[];

  @OneToMany(() => VehiculosTitulares, vehiculo_titular => vehiculo_titular.vehiculo)
  vehiculo_titular: VehiculosTitulares[];

  @ManyToOne(() => Usuarios, usuario => usuario.personas)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.personas)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

}