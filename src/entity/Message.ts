import { ObjectType, Field, Int, ID } from "type-graphql";
import Server from "./Server";

@ObjectType()
export default class Message {
    @Field()
    public id!: number;

    @Field()
    public name!: string;
}
