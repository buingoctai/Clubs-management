import { Entity, Column, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Club {
    // @ObjectIdColumn()
    // id: number;
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameClub: string;

    @Column()
    shortName: string;
//------------------------------
    // @Column()
    // competitor: string[];
    // @Column()
    // result:number[];
    // @Column()
    // goalNumber:number;
    // @Column()
    // lossNumber:Number;
}