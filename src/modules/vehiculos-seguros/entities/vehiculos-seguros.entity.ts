import { SegurosEmpresas } from "src/modules/seguros-empresas/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { Vehiculos } from "src/modules/vehiculos/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class VehiculosSeguros {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100
  })
  nro_poliza: string;

  @Column()
  fecha_desde: Date;

  @Column()
  fecha_hasta: Date;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Vehiculos, vehiculo => vehiculo.seguro)
  @JoinColumn({ name: 'vehiculo_id' })
  vehiculo: Vehiculos;

  @ManyToOne(() => SegurosEmpresas, empresa => empresa.seguro)
  @JoinColumn({ name: 'empresa_id' })
  empresa: SegurosEmpresas;

  @ManyToOne(() => Usuarios, usuario => usuario.personas)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.personas)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

}