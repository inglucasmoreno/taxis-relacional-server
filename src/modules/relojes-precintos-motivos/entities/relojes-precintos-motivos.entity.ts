import { RelojesPrecintos } from "src/modules/relojes-precintos/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RelojesPrecintosMotivos {

  @PrimaryGeneratedColumn('increment')
  id: number;  

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 200
   })
  descripcion: string;
  
  @Column({ default: true })
  activo: boolean;
   
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToMany(() => RelojesPrecintos, precinto => precinto.motivo)
  precinto: RelojesPrecintos[];

  @ManyToOne(() => Usuarios, usuario => usuario.relojes_precintos_motivos)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.relojes_precintos_motivos)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

}