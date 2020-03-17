import {
    Entity,
    PrimaryColumn,
    Column,
    BaseEntity,
    ManyToMany,
    OneToMany,
    JoinTable,
} from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";

@ObjectType()
@Entity("user", { synchronize: true })
export default class User extends BaseEntity {
    @Field()
    @PrimaryColumn()
    public id!: string;

    @Column()
    public password!: string;

    @Field()
    @Column()
    public name!: string;

    @Field()
    @Column()
    public email!: string;
}
