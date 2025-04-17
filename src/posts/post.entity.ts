import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  category: string;
  //유저
  @Column()
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;
  @Column({ type: 'integer', default: 0 })
  likes: number;
  @Column({ type: 'integer', default: 0 })
  comments: number;
}
