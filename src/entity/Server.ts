import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, ManyToMany, JoinColumn, JoinTable, BaseEntity } from "typeorm";
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

    @Field()
    @ManyToOne((type) => User)
    @JoinColumn()
    public Owner!: User;

    @Field(() => [User])
    @ManyToMany((type) => User)
    @JoinTable({
        joinColumn: {
            name: "fk_manager_id",
        },
        inverseJoinColumn: {
            name: "fk_server_id",
        },
    })
    public Manager?: User[];

    @Field(() => [User])
    @ManyToMany((type) => User)
    @JoinTable()
    public Member?: User[];
}
