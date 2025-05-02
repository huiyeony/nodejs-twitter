import { Post } from 'src/posts/post.entity';
import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('likes')
export class Like {
  @PrimaryColumn()
  userId: string;
  @PrimaryColumn()
  postId: number;
  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  post: Post;
}
