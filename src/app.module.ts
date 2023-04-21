import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { jwtConstants } from './modules/auth/constants';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { InicializacionModule } from './modules/inicializacion/inicializacion.module';
import { VehiculosColoresModule } from './modules/vehiculos-colores/vehiculos-colores.module';
import { VehiculosModule } from './modules/vehiculos/vehiculos.module';
import { VehiculosMarcasModule } from './modules/vehiculos-marcas/vehiculos-marcas.module';
import { VehiculosModelosModule } from './modules/vehiculos-modelos/vehiculos-modelos.module';
import { PersonasModule } from './modules/personas/personas.module';
import { RelojesMarcasModule } from './modules/relojes-marcas/relojes-marcas.module';
import { RelojesModelosModule } from './modules/relojes-modelos/relojes-modelos.module';
import { RelojesModule } from './modules/relojes/relojes.module';
import { SegurosEmpresasModule } from './modules/seguros-empresas/seguros-empresas.module';
import { VehiculosSegurosModule } from './modules/vehiculos-seguros/vehiculos-seguros.module';
import { RelojesPrecintosMotivosModule } from './modules/relojes-precintos-motivos/relojes-precintos-motivos.module';
import { RelojesPrecintosModule } from './modules/relojes-precintos/relojes-precintos.module';
import { LicenciasModule } from './modules/licencias/licencias.module';
import { LicenciasChoferesModule } from './modules/licencias-choferes/licencias-choferes.module';
import { LicenciasVehiculosModule } from './modules/licencias-vehiculos/licencias-vehiculos.module';
import { LicenciasPermisionarioModule } from './modules/licencias-permisionario/licencias-permisionario.module';
import { SigemModule } from './modules/sigem/sigem.module';
import { VehiculosTitularesModule } from './modules/vehiculos_titulares/vehiculos_titulares.module';
import { LicenciasTramitesModule } from './modules/licencias-tramites/licencias-tramites.module';
import { TiposServiciosModule } from './modules/tipos-servicios/tipos-servicios.module';

@Module({
  imports: [

    // Directorio publico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),

    // Variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),

    // Autenticacion -> JsonWebToken
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' }
    }),

    // Conexion a base de datos
    DatabaseModule,
    
    // Custom modules
    AuthModule,
    UsuariosModule,
    InicializacionModule,
    VehiculosColoresModule,
    VehiculosModule,
    VehiculosMarcasModule,
    VehiculosModelosModule,
    PersonasModule,
    RelojesMarcasModule,
    RelojesModelosModule,
    RelojesModule,
    SegurosEmpresasModule,
    VehiculosSegurosModule,
    RelojesPrecintosMotivosModule,
    RelojesPrecintosModule,
    LicenciasModule,
    LicenciasChoferesModule,
    LicenciasVehiculosModule,
    LicenciasPermisionarioModule,
    SigemModule,
    VehiculosTitularesModule,
    LicenciasTramitesModule,
    TiposServiciosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService){
    AppModule.port = +this.configService.get('PORT');
  }
}
