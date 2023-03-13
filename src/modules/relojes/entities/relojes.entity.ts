import { RelojesMarcas } from "src/modules/relojes-marcas/entities";
import { RelojesModelos } from "src/modules/relojes-modelos/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Relojes {

  @PrimaryGeneratedColumn('increment')
  id: number;  

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 100
   })
  nro_serie: string;

  @Column({ default: true })
  activo: boolean;
   
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RelojesMarcas, marca => marca.reloj)
  @JoinColumn({ name: 'marca_id' })
  marca: RelojesMarcas;

  @ManyToOne(() => RelojesModelos, modelo => modelo.reloj)
  @JoinColumn({ name: 'modelo_id' })
  modelo: RelojesModelos;

}