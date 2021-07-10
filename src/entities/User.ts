import { Exclude, Expose } from "class-transformer";
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

  @Expose({ name: "first_name" })
  firstName(): string {
    const names = this.fullname.split(" ");
    return names.length > 1 ? names[0] : this.fullname;
  }

  @Expose({ name: "last_name" })
  lastName(): string {
    const names = this.fullname.split(" ");
    return names.length > 1 ? names.slice(1).join(" ") : "";
  }

  @Exclude()
  @Column()
  password: string;

  @Column()
  email: string;

  @Expose({ groups: ["self"] })
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
