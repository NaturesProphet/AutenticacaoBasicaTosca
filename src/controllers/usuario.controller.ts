import { Controller, Post, Param, Res, HttpStatus, Body, Req, Get } from '@nestjs/common';
import { UsuarioService } from '../../src/services/usuario.service';
import { Usuario } from '../../src/models/usuario.model';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller( 'usuario' )
@ApiUseTags( 'Usuários' )
export class UsuarioController {
    constructor( private readonly Service: UsuarioService ) { }
    @Post( '/novo' )
    @ApiOperation( {
        description: 'Salva um novo usuário',
        title: 'Salvar novo usuário',
    } )
    async save( @Body() body, @Res() res ) {
        try {
            const u: Usuario = new Usuario();
            u.login = body.login;
            u.password = body.password;
            u.email = body.email;
            await this.Service.save( u );
            return res
                .status( HttpStatus.OK )
                .send( 'Usuario registrado com sucesso' );

        } catch ( e ) {
            return res
                .status( HttpStatus.BAD_REQUEST )
                .send( `O usuario não pode ser registrado\n${e.message}` );
        }
    }

    @Post( '/update' )
    @ApiOperation( {
        description: 'atualiza os dados de um usuario',
        title: 'atualizar usuários',
    } )
    async update( @Body() body, @Res() res ) {
        try {
            const u: Usuario = new Usuario();
            u.login = body.login;
            u.password = body.password;
            u.email = body.email;
            await this.Service.update( u );
            return res
                .status( HttpStatus.OK )
                .send( 'Usuario atualizado com sucesso' );

        } catch ( e ) {
            return res
                .status( HttpStatus.BAD_REQUEST )
                .send( `O usuario não pode ser atualizado\n${e.message}` );
        }
    }

    @Get()
    @ApiOperation( {
        description: 'Verificar os usuários ativos na seção atual',
        title: 'Listar usuários ativos',
    } )
    async active( @Req() req, @Res() res ) {
        if ( req.session.usuario ) {
            res.
                status( 200 ).
                send( req.session.usuario.login );
        } else {
            return res
                .status( HttpStatus.UNAUTHORIZED )
                .send( `Nenhum usuário conectado no momento.` );
        }
    }

    @Get( '/logoff' )
    @ApiOperation( {
        description: 'Aqui o usuário se desconecta, limpando seus cookies',
        title: 'Logoff',
    } )
    async logoff( @Req() req, @Res() res ) {
        if ( req.session.usuario ) {
            res.
                status( 200 ).
                clearCookie( 'AuthTarefas', '*' ).send( 'Usuario desconectado com sucesso.' );
        } else {
            return res
                .status( HttpStatus.UNAUTHORIZED )
                .send( `Nenhum usuário conectado no momento.` );
        }
    }
}
