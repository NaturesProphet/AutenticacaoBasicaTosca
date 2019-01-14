import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Usuario } from './usuario.model';

@Entity()
export class Tarefa extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @CreateDateColumn()
    @ApiModelProperty()
    dataregistro: Date;

    @UpdateDateColumn()
    @ApiModelProperty()
    atualizadoem: Date;

    @Column()
    @ApiModelProperty()
    desc: string;

    // ###################################################################
    // ############################ RELAÇÕES #############################
    // ###################################################################

    @ManyToOne( type => Usuario, { nullable: false } )
    @JoinColumn( { referencedColumnName: 'login', name: 'usuario_login' } )
    @ApiModelProperty()
    usuarioLogin: string;

}
