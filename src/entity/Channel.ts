import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";
import Server from "./Server";

@ObjectType()
@Entity()
export default class Channel extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    public id!: number;

    @Field()
    @Column()
    public name!: string;

    @Field()
    @ManyToOne((type) => Server)
    public server!: Server;
}
