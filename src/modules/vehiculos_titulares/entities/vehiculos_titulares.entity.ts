import { Personas } from "src/modules/personas/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { Vehiculos } from "src/modules/vehiculos/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class VehiculosTitulares {

  @PrimaryGeneratedColumn('increment')
  id: number;  

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 50
   })
  numero_titulo: string;

  @Column({ nullable: false })
  porcentaje: number;

  @Column({ nullable: false })
  fecha_inscripcion_inicial: Date;

  @Column({ default: true })
  activo: boolean;
   
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Usuarios, usuario => usuario.colores)
  @JoinColumn({ name: 'creatorUser' })
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.colores)
  @JoinColumn({ name: 'updatorUser' })
  updatorUser: Usuarios;

  @ManyToOne(() => Personas, persona => persona.vehiculo_titular)
  @JoinColumn({ name: 'persona_id' })
  persona: Personas;

  // @ManyToOne(() => Vehiculos, vehiculo => vehiculo.vehiculo_titular)
  // @JoinColumn({ name: 'vehiculo_id' })
  // vehiculo: Vehiculos

}