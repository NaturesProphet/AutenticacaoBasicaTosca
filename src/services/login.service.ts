import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Usuario } from 'src/models/usuario.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {

    async login( usuarioLogin: string, usuarioPassword: string ) {
        const usuario = await Usuario.findOne( { where: { login: usuarioLogin } } );
        if ( !usuario ) {
            throw new Error( 'Usuario não encontrado' );
        }

        const souEu: boolean = await bcrypt.compare( usuarioPassword, usuario.password );
        if ( souEu ) {
            usuario.password = null;
            return usuario;
        } else {
            throw new UnauthorizedException();
        }
    }
}
