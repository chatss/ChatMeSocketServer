import { ArgsType, Field } from "type-graphql";

@ArgsType()
export default class RegisterArgs {
    @Field()
    id!: string;

    @Field()
    password!: string;

    @Field()
    name!: string;

    @Field()
    email!: string;
}
