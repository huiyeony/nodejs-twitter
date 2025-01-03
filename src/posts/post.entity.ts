import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  //유저
  @Column()
  username: string;

  @Column({ default: 'http://placehold.co/60x60/png' })
  avatar: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column()
  content: string;

  @Column({ default: 'http://placehold.co/160x160/png' })
  image: string;
  // @Column()
  // title: string;
  // @Column()
  // handle: string;
  // @Column({ default: 0 })
  // likes: number;
  // @Column({ default: 0 })
  // retweets: number;
  // @Column({ default: 0 })
  // replies: number;
  // @Column({ default: 0 })
  // views: number;
}
