import { BaseEntity, PrimaryColumn, Entity, CreateDateColumn } from "typeorm";

@Entity()
export default class ServerMembersUser extends BaseEntity {
    @PrimaryColumn()
    userId!: string;

    @PrimaryColumn()
    serverId!: number;

    @CreateDateColumn({ type: "timestamp" })
    likedAt!: Date;
}
