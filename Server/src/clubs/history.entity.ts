import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shortName: string;

    @Column()
    matchNumber:number;

    @Column()
    winNumber:number;
    @Column()
    drawNumber:number;

    @Column()
    loseNumber:number;

    @Column()
    yellowNumber:number;

    @Column()
    redNumber:number;

    @Column()
    fNumber:number;

    @Column()
    aNumber:number;
    
    @Column()
    score:number;

}