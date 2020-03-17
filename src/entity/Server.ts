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
    @Field(() => [User])
    public members?: User[];
}
