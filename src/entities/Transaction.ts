import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { v4 as uuid } from "uuid";

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
  description: string;

  @Column()
  public: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
