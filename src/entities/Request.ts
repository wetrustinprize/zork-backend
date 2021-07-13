import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("requests")
class Request {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  zorks: number;

  @Column()
  last_zorks: number;

  @Column()
  description: string;

  @Column()
  request_canceled: boolean;

  @Column()
  request_result: string;

  @JoinColumn({ name: "request_result" })
  @ManyToOne(() => Transaction)
  request_transaction: Transaction;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Request };
