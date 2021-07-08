import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";

@Entity("transactions")
export class Transaction {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  zorks: number;

  @Column()
  from_id: string;

  @JoinColumn({ name: "from_id" })
  @ManyToOne(() => User)
  from_user: User;

  @Column()
  to_id: string;

  @JoinColumn({ name: "to_id" })
  @ManyToOne(() => User)
  to_user: User;

  @Column()
  public: boolean;

  @CreateDateColumn()
  created_at: Date;
}
