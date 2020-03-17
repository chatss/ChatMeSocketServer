import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";
import Server from "./Server";

@ObjectType()
@Entity("channel", { synchronize: true })
export default class Channel extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    public id!: number;

    @Field()
    @Column()
    public name!: string;

    // @Field(() => Server, { name: "server" })
    @ManyToOne(
        () => Server,
        (server) => server.channels,
    )
    serverId!: number;
}
