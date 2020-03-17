import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinColumn,
    JoinTable,
    BaseEntity,
} from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";
import User from "./User";
import Channel from "./Channel";

@ObjectType()
@Entity("server", { synchronize: true })
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

    @Field(() => [User])
    @ManyToMany(() => User, { eager: true })
    @JoinTable({
        joinColumn: {
            name: "serverId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "userId",
            referencedColumnName: "id",
        },
    })
    public members?: User[];

    @Field(() => [Channel])
    @OneToMany(
        () => Channel,
        (channel) => channel.serverId,
        { eager: true },
    )
    channels?: Channel[];
}
