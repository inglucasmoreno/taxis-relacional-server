import { Usuarios } from "src/modules/usuarios/entities";
import { Vehiculos } from "src/modules/vehiculos/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class VehiculosColores {

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

  @OneToMany(() => Vehiculos, vehiculo => vehiculo.color)
  vehiculo: Vehiculos[]

  @ManyToOne(() => Usuarios, usuario => usuario.colores)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.colores)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

}