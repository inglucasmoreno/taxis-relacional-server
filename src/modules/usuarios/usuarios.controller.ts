import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { CambioPasswordDTO, UsuariosDTO, UsuariosUpdateDTO } from './dto';
import { Usuarios } from './entities';
import { UsuariosService } from './usuarios.service';
import * as bcryptjs from 'bcryptjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {

  constructor(private readonly usuariosService: UsuariosService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async usuarioPorId(@Res() res, @Param('id') id: number): Promise<Usuarios> {

    const usuario = await this.usuariosService.getUsuario(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Usuario obtenido correctamente',
      usuario      
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarUsuarios(@Res() res, @Query() query): Promise<Usuarios[]> {
    const usuarios = await this.usuariosService.listarUsuarios(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Usuarios obtenidos correctamente',
      usuarios     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoUsuario(@Res() res, @Body() usuariosDTO: UsuariosDTO): Promise<Usuarios> {

    const { password } = usuariosDTO;

    // Encriptado de password
    const salt = bcryptjs.genSaltSync();
    usuariosDTO.password = bcryptjs.hashSync(password, salt);

    const usuario = await this.usuariosService.crearUsuario(usuariosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Usuario creado correctamente',
      usuario
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarUsuario(@Res() res, @Param('id') id: number, @Body() usuarioUpdateDTO: any){

    const { password } = usuarioUpdateDTO;

    // Se encripta el password en caso de que se tenga que actualizar
    if(password){
      const salt = bcryptjs.genSaltSync();
      usuarioUpdateDTO.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await this.usuariosService.actualizarUsuario(id, usuarioUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Usuario actualizado correctamente',
      usuario
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch('/password/:id')
  async actualizarPassword(@Res() res, @Param('id') id: number, @Body() cambioPasswordDTO: CambioPasswordDTO){

    await this.usuariosService.actualizarPasswordPerfil(id, cambioPasswordDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Password actualizado correctamente',
    })

  }

}
