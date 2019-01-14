import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './common/configs/db.config';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { TarefaService } from './services/tarefa.service';
import { TarefaController } from './controllers/tarefa.controller';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { AppController } from './controllers/app.controller';
const database = new DbConfig();

@Module( {
  imports: [ TypeOrmModule.forRoot( {
    type: database.type,
    host: database.host,
    port: database.port,
    username: database.login,
    password: database.password,
    database: database.schema,
    entities: [ __dirname + '/**/*.model{.ts,.js}' ],
    synchronize: database.sync,
  } ) ],

  controllers: [ UsuarioController, TarefaController, LoginController, AppController ],
  providers: [ UsuarioService, TarefaService, LoginService ],
} )

export class AppModule { }
