import { RelojesMarcas } from "src/modules/relojes-marcas/entities";
import { Relojes } from "src/modules/relojes/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RelojesModelos {

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
  
  @ManyToOne(() => RelojesMarcas, marca => {marca.modelos})
  @JoinColumn({ name: 'marca_id' })
  marca: RelojesMarcas;

  @OneToMany(() => Relojes, reloj => reloj.modelo)
  reloj: Relojes[]

  @ManyToOne(() => Usuarios, usuario => usuario.relojes_modelos)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.relojes_modelos)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;


}