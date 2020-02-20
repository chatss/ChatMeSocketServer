import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import User from "./User";

@Entity()
export default class Server {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public namespace!: string;

    @OneToOne((type) => User)
    @JoinColumn()
    public Owner!: User;

    @ManyToMany((type) => User)
    @JoinTable()
    public Manager?: User[];

    @ManyToMany((type) => User)
    @JoinTable()
    public Member?: User[];
}
