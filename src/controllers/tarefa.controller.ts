import { Controller, Get, Res, HttpStatus, Body, Post, Param, Req } from '@nestjs/common';
import { TarefaService } from 'src/services/tarefa.service';
import { Tarefa } from 'src/models/tarefa.model';
import { Usuario } from 'src/models/usuario.model';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@Controller( 'tarefas' )
@ApiUseTags( 'Tarefas' )

export class TarefaController {
    constructor( private readonly Service: TarefaService ) { }
    @Get()
    @ApiOperation( {
        description: 'Listar as tarefas do usuário autenticado',
        title: 'Listar tarefas',
    } )
    @ApiResponse(
        {
            status: 200,
            description: 'Tarefas listadas',
            type: Tarefa,
            isArray: true,
        } )
    async listar( @Res() res, @Req() req ) {

        if ( req.session.usuario ) {
            try {
                const u: Usuario = await Usuario.findOne( { login: req.session.usuario.login } );
                if ( !u ) {
                    return res
                        .status( HttpStatus.BAD_REQUEST )
                        .send( `Não existe nenhum usuario com o login ${req.session.usuario.login}` );
                }
                return res
                    .status( HttpStatus.OK )
                    .send( await this.Service.listar( req.session.usuario.login ) );
            } catch ( e ) {
                return res
                    .status( HttpStatus.BAD_REQUEST )
                    .send( `Erro ao buscar tarefas\n${e.message}` );
            }
        } else {
            return res
                .status( HttpStatus.UNAUTHORIZED )
                .send( `Usuário não autenticado` );
        }
    }

    @Post()
    @ApiOperation( {
        description: 'Salva uma nova tarefa para o usuário autenticado',
        title: 'Salvar Tarefa',
    } )
    async salvar( @Res() res, @Body() body, @Req() req ) {
        try {
            const t: Tarefa = new Tarefa();
            t.desc = body.desc;
            t.usuarioLogin = req.session.usuario.login;
            await this.Service.save( t );
            return res
                .status( HttpStatus.OK )
                .send( 'tarefa salva com sucesso.' );
        } catch ( e ) {
            return res
                .status( HttpStatus.BAD_REQUEST )
                .send( `Erro ao salvar tarefa\n${e.message}` );
        }
    }

}
