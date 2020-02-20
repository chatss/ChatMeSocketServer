import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    public id!: number;

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
