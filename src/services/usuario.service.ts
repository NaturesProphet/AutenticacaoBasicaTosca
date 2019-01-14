import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/models/usuario.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {

    async save( u: Usuario ) {
        const test: Usuario = await Usuario.findOne( { login: u.login } );
        if ( test ) {
            throw new Error( 'Usuário já existe' );
        } else {
            const hash = bcrypt.hashSync( u.password );
            u.password = hash;
            return u.save();

        }
    }

    async update( u: Usuario ) {
        const test: Usuario = await Usuario.findOne( { login: u.login } );
        if ( !test ) {
            throw new Error( 'Usuário não existe' );
        } else {
            test.password = bcrypt.hashSync( u.password );
            test.login = u.login;
            test.email = u.email;
            try {
                await test.save();
            } catch ( e ) {
                throw e;
            }
        }
    }

}
