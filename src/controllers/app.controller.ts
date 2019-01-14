import { Controller, Get, Res } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
@ApiUseTags( 'rota raiz -> swagger' )
export class AppController {
    @Get()
    @ApiOperation( {
        description: 'apenas redireciona a requisição para a pagina do swagger',
        title: 'Swagger',
    } )
    async root( @Res() res ) {
        return res.redirect( '/docs' );
    }
}
