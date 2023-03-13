import { RelojesModelos } from "src/modules/relojes-modelos/entities/relojes-modelos.entity";
import { Relojes } from "src/modules/relojes/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RelojesMarcas {

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

  @OneToMany(() => RelojesModelos, modelos => modelos.marca)
  modelos: RelojesModelos[];

  @OneToMany(() => Relojes, reloj => reloj.marca)
  reloj: Relojes[]

  @ManyToOne(() => Usuarios, usuario => usuario.relojes_marcas)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.relojes_marcas)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;


}