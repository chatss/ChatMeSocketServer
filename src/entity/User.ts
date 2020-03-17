import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";
import Server from "./Server";
import ServerToMember from "./ServerToMember";
@ObjectType()
@Entity("user", { synchronize: true })
export default class User extends BaseEntity {
    @Field()
    @PrimaryColumn()
    public id!: string;

    @Field()
    @Column()
    public password!: string;

    @Field()
    @Column()
    public name!: string;

    @Field()
    @Column()
    public email!: string;

    @ManyToMany(
        (type) => Server,
        (server) => server.members,
    )
    public servers!: Server[];

    @OneToMany(
        (type) => ServerToMember,
        (serverToMember) => serverToMember.user,
    )
    public serverToMembers!: ServerToMember[];
}
