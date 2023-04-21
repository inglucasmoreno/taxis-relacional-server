import { Licencias } from "src/modules/licencias/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TiposServicios {

  @PrimaryGeneratedColumn('increment')
  id: number;  

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 100
   })
  descripcion: string;

  @Column({ default: true })
  activo: boolean;
   
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Licencias, licencias => licencias.tipo_servicio)
  licencias: Licencias[]

  @ManyToOne(() => Usuarios, usuario => usuario.tipos_servicios)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.tipos_servicios)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

}