import { LicenciasChoferes } from "src/modules/licencias-choferes/entities";
import { LicenciasPermisionarios } from "src/modules/licencias-permisionario/entities";
import { LicenciasVehiculos } from "src/modules/licencias-vehiculos/entities";
import { Licencias } from "src/modules/licencias/entities";
import { Personas } from "src/modules/personas/entities";
import { RelojesMarcas } from "src/modules/relojes-marcas/entities";
import { RelojesModelos } from "src/modules/relojes-modelos/entities";
import { RelojesPrecintosMotivos } from "src/modules/relojes-precintos-motivos/entities";
import { Relojes } from "src/modules/relojes/entities";
import { SegurosEmpresas } from "src/modules/seguros-empresas/entities";
import { TiposServicios } from "src/modules/tipos-servicios/entities";
import { VehiculosColores } from "src/modules/vehiculos-colores/entities";
import { VehiculosMarcas } from "src/modules/vehiculos-marcas/entities";
import { VehiculosModelos } from "src/modules/vehiculos-modelos/entities";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuarios {

  @PrimaryGeneratedColumn('increment')
  id: number;  

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 50
   })
  usuario: string;

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 50
  })
  dni: string;

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 50
   })
  apellido: string;

  @Column({ 
    nullable: false,
    type: 'varchar',
    length: 50
  })
  nombre: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  password: string;

  @Column({ 
    nullable: true,
    type: 'varchar',
    length: 50 
  })
  email: string;

  @Column({ 
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
    default: 'ADMIN_ROLE'
  })
  role: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  
  @OneToMany(() => Licencias, () => {})
  licencias: Licencias[];

  @OneToMany(() => LicenciasChoferes, () => {})
  licencias_choferes: LicenciasChoferes[];

  @OneToMany(() => LicenciasPermisionarios, () => {})
  licencias_permisionarios: LicenciasPermisionarios[];

  @OneToMany(() => LicenciasVehiculos, () => {})
  licencias_vehiculos: LicenciasVehiculos[];

  @OneToMany(() => Personas, () => {})
  personas: Personas[];

  @OneToMany(() => Relojes, () => {})
  relojes: Relojes[];

  @OneToMany(() => RelojesMarcas, () => {})
  relojes_marcas: RelojesMarcas[];

  @OneToMany(() => RelojesModelos, () => {})
  relojes_modelos: RelojesModelos[];

  @OneToMany(() => RelojesPrecintosMotivos, () => {})
  relojes_precintos_motivos: RelojesPrecintosMotivos[];

  @OneToMany(() => SegurosEmpresas, () => {})
  seguros_empresas: SegurosEmpresas[];
  
  @OneToMany(() => VehiculosMarcas, () => {})
  vehiculos_marcas: VehiculosMarcas[];

  @OneToMany(() => VehiculosModelos, () => {})
  vehiculos_modelos: VehiculosModelos[];

  @OneToMany(() => VehiculosColores, () => {})
  colores: VehiculosColores[];

  @OneToMany(() => TiposServicios, () => {})
  tipos_servicios: TiposServicios[];

}