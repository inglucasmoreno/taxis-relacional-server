import { RelojesPrecintosMotivos } from "src/modules/relojes-precintos-motivos/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RelojesPrecintos {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100
  })
  nro_precinto: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RelojesPrecintosMotivos, motivo => motivo.precinto)
  @JoinColumn({ name: 'motivo_id' })
  motivo: RelojesPrecintosMotivos

}