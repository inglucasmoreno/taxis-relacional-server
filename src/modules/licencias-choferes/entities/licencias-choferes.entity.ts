import { Licencias } from "src/modules/licencias/entities";
import { Personas } from "src/modules/personas/entities";
import { Usuarios } from "src/modules/usuarios/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class LicenciasChoferes {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    default: new Date()
  })
  fecha_alta: Date;

  @Column({
    default: new Date()
  })
  fecha_baja: Date;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  libreta_sanitaria: string;

  @Column({
    default: new Date()
  })
  carnet_conducir_vencimiento: Date;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  certificado_antecedentes: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: ''
  })
  seguro_accidentes_personales: string;

  @Column({
    type: 'varchar',
    length: 150,
    default: ''
  })
  motivo_baja: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Personas, persona => persona.licencia_chofer)
  @JoinColumn({ name: 'persona_id' })
  persona: Personas

  @ManyToOne(() => Licencias, licencia => licencia.licencia_chofer)
  @JoinColumn({ name: 'licencia_id' })
  licencia: Licencias

  @ManyToOne(() => Usuarios, usuario => usuario.licencias_choferes)
  creatorUser: Usuarios;

  @ManyToOne(() => Usuarios, usuario => usuario.licencias_choferes)
  updatorUser: Usuarios;

}