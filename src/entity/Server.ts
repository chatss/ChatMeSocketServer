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

    @Field({ nullable: true })
    @ManyToOne((type) => User, { cascade: true, eager: true })
    @JoinColumn({ name: "Owner" })
    public Owner!: User;

    @Field(() => [User])
    @ManyToMany((type) => User, { cascade: true, eager: true })
    @JoinTable({
        joinColumn: {},
        inverseJoinColumn: {},
    })
    public Manager?: User[];

    @Field(() => [User])
    @ManyToMany((type) => User, { cascade: true, eager: true })
    @JoinTable()
    public Member?: User[];
}
