import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";

@ObjectType()
@Entity()
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
}
