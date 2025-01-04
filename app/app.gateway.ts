import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreatePostDto } from '../src/posts/post.dto';

@WebSocketGateway()
export class AppGateway {
  //소켓 & 메시지 관리
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { message: string },
    @ConnectedSocket() connectedSocket: Socket,
  ) {
    console.log(`message from client ${message.message}`);
    this.server.emit('message', { data: 'message from server' });
  }
  @SubscribeMessage('newPost')
  handleNewPost(
    @MessageBody() newPost: CreatePostDto,
    @ConnectedSocket() connectedSocket: Socket,
  ) {
    //console.log(`new post received ${newPost.content}`);
    this.server.emit('newPost', newPost);
  }
}
