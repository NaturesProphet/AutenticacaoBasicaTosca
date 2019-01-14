import { Entity, Column, OneToMany, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Tarefa } from './tarefa.model';

@Entity()
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @CreateDateColumn()
    @ApiModelProperty()
    dataregistro: Date;

    @UpdateDateColumn()
    @ApiModelProperty()
    atualizadoem: Date;

    @Index( { unique: true } )
    @Column()
    @ApiModelProperty()
    login: string;

    @Column()
    @ApiModelProperty()
    password: string;

    @Column()
    @Index( { unique: true } )
    @ApiModelProperty()
    email: string;

    // ###################################################################
    // ############################ RELAÇÕES #############################
    // ###################################################################

    @OneToMany( type => Tarefa, tarefas => Tarefa )
    tarefas: Tarefa[];

}
