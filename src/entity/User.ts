import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({
    type: "uuid",
    nullable: true,
  })
  role: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  photo: string;

  @Column()
  password: string;
}
