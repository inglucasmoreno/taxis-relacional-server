import { LicenciasChoferes } from "src/modules/licencias-choferes/entities";
import { LicenciasPermisionarios } from "src/modules/licencias-permisionario/entities/licencias-permisionarios.entity";
import { Usuarios } from "src/modules/usuarios/entities";
import { VehiculosTitulares } from "src/modules/vehiculos_titulares/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Personas {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50
  })
  apellido: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50
  })
  nombre: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50
  })
  dni: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100
  })
  domicilio: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100
  })
  mail: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50
  })
  telefono: string;

  @Column({ default: false })
  sigem: boolean;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => LicenciasChoferes, licencia_chofer => licencia_chofer.persona)
  licencia_chofer: LicenciasChoferes[]

  @OneToMany(() => LicenciasPermisionarios, licencia_permisionario => licencia_permisionario.persona)
  licencia_permisionario: LicenciasPermisionarios[]

  @OneToMany(() => VehiculosTitulares, vehiculo_titular => vehiculo_titular.persona)
  vehiculo_titular: VehiculosTitulares[]

  @ManyToOne(() => Usuarios, usuario => usuario.personas)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.personas)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

}