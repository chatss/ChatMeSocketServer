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
import ServerToMember from "./ServerToMember";

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

    // @Field({ nullable: true })
    // @ManyToOne(() => User, { cascade: true, eager: true })
    // @JoinColumn({ name: "owner" })
    // public owner!: User;

    @Field(() => [User], { nullable: true })
    @ManyToMany(
        () => User,
        (user) => user.servers,
    )
    @JoinTable()
    public members?: User[];

    @OneToMany(
        (type) => ServerToMember,
        (serverToMember) => serverToMember.server,
    )
    public serverToMembers!: ServerToMember[];
}
