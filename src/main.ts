import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieSession = require( 'cookie-session' );
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create( AppModule );

  app.use( cookieSession( {
    name: 'AuthTarefas',
    keys: [ 'secret-key' ],

    // Cookie Options
    maxAge: 60 * 60 * 1000,
  } ) );

  const options = new DocumentBuilder()
    .setTitle( 'Autenticação rudimentar com Cookies' )
    .setDescription( 'Uma maneira simples e rudimentar de implementar autenticação usando Cookies, mas funciona ;)' )
    .setVersion( '1.0' )
    .addTag( 'auth_tosco' )
    .setSchemes( 'http' )
    .build();
  const document = SwaggerModule.createDocument( app, options );

  SwaggerModule.setup( `/docs`, app, document );

  await app.listen( 3000 );
}
bootstrap();
