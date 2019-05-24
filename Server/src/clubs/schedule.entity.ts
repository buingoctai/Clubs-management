import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teamA: string;

    @Column()
    teamB:string;

    @Column()
    score:string;

    @Column()
    yellow:string;

    @Column()
    red:string;

    // @Column()
    // fNumber:string;

    // @Column()
    // aNumber:string;





    
}