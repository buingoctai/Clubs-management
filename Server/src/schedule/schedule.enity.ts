import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    clubName: string;

    @Column()
    competitor: string[];
    @Column()
    result:number[];
    @Column()
    goalNumber:number;
    @Column()
    lossNumber:Number;
    
}