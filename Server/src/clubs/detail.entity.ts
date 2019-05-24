import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DetailClub {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shortName: string;

    @Column()
    nameClub:string;

    @Column()
    stadium:string;

    @Column()
    place:string;

    @Column()
    president:string;
    
    @Column()
    founded:string;
    
}