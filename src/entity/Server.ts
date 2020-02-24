import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn, JoinTable, BaseEntity } from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";
import User from "./User";

@ObjectType()
@Entity()
export default class Server extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    public id!: number;

    @Field()
    @Column()
    public name!: string;

    @Field()
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
