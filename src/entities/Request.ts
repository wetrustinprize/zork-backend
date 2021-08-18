import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Expose } from "class-transformer";

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

  @Column({ nullable: true })
  request_result: string;

  @JoinColumn({ name: "request_result" })
  @ManyToOne(() => Transaction)
  request_transaction: Transaction;

  @Expose({ name: "completed" })
  completed(): boolean {
    return this.request_result !== null;
  }

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
