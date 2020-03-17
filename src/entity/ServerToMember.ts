import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, ManyToMany, JoinColumn, JoinTable, BaseEntity } from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";
import User from "./User";
import Server from "./Server";

@ObjectType()
@Entity("servertomember", { synchronize: true })
export default class ServerToMember extends BaseEntity {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number;

    @Column()
    public postId!: number;

    @Column()
    public categoryId!: number;

    @Column()
    public order!: number;

    @ManyToOne(
        (type) => Server,
        (Server) => Server.serverToMembers,
    )
    public server!: Server;

    @ManyToOne(
        (type) => User,
        (user) => user.serverToMembers,
    )
    public user!: User;
}
