import { Usuarios } from "src/modules/usuarios/entities";
import { VehiculosMarcas } from "src/modules/vehiculos-marcas/entities";
import { Vehiculos } from "src/modules/vehiculos/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class VehiculosModelos {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50
  })
  descripcion: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => VehiculosMarcas, marca => {marca.modelos})
  @JoinColumn({ name: 'marca_id' })
  marca: VehiculosMarcas;

  @OneToMany(() => Vehiculos, vehiculo => vehiculo.modelo)
  vehiculo: Vehiculos[];

  @ManyToOne(() => Usuarios, usuario => usuario.vehiculos_modelos)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.vehiculos_modelos)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

}