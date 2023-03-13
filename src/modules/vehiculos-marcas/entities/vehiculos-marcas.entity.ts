import { Usuarios } from "src/modules/usuarios/entities";
import { VehiculosModelos } from "src/modules/vehiculos-modelos/entities";
import { Vehiculos } from "src/modules/vehiculos/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class VehiculosMarcas {

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

  @OneToMany(() => VehiculosModelos, modelos => modelos.marca)
  modelos: VehiculosModelos[];

  @OneToMany(() => Vehiculos, vehiculo => vehiculo.marca)
  vehiculo: Vehiculos[]

  @ManyToOne(() => Usuarios, usuario => usuario.vehiculos_marcas)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.vehiculos_marcas)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

}