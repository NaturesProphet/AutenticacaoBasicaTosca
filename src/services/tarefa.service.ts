import { Injectable } from '@nestjs/common';
import { Tarefa } from 'src/models/tarefa.model';

@Injectable()
export class TarefaService {

    async save( t: Tarefa ) {
        await t.save();
    }

    async listar( login: string ) {
        return await Tarefa.find( { usuarioLogin: login } );
    }
}
