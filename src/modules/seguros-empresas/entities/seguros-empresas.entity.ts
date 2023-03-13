import { Usuarios } from "src/modules/usuarios/entities";
import { VehiculosSeguros } from "src/modules/vehiculos-seguros/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SegurosEmpresas {

  @PrimaryGeneratedColumn('increment')
  id: number;  

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 100
   })
  descripcion: string;

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 200
   })
  direccion: string;

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 50
   })
  telefono: string;

  @Column({ default: true })
  activo: boolean;
   
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => VehiculosSeguros, seguro => seguro.empresa)
  seguro: VehiculosSeguros[];

  @ManyToOne(() => Usuarios, usuario => usuario.seguros_empresas)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.seguros_empresas)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

}