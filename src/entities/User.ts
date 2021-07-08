import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  fullname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  zorks: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.zorks) {
      this.zorks = 200;
    }
  }
}

export { User };
