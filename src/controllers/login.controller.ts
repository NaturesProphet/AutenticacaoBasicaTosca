import { Controller, Post, Req, Res, Body, HttpStatus, UnauthorizedException, Get } from '@nestjs/common';
import { LoginService } from 'src/services/login.service';
import { Usuario } from 'src/models/usuario.model';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';

@Controller( 'login' )
@ApiUseTags( 'Autenticação' )

export class LoginController {
    constructor( private readonly Service: LoginService ) { }

    @Post()
    @ApiOperation( {
        description: 'Aqui o usuário se autentica, enviando login e senha, para poder ganhar um Cookie ;)',
        title: 'Login',
    } )

    async login( @Req() req, @Res() res, @Body() body ) {
        let usuario: Usuario;
        try {
            usuario = await this.Service.login( body.login, body.password );
            res.clearCookie( 'AuthTarefas', '*' );
            req.session.usuario = usuario;
            return res.send( 'autorizado' );
        } catch ( e ) {
            if ( e instanceof UnauthorizedException ) {
                return res
                    .status( HttpStatus.UNAUTHORIZED )
                    .send( 'NÃO AUTORIZADO' );
            } else {
                return res
                    .status( HttpStatus.UNAUTHORIZED )
                    .send( `Falha de autenticação.\n${e.message}` );
            }
        }
    }

}
