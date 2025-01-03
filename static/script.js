const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
let currentRoom;

const nickName = prompt('닉네임을 입력해주세요');
function joinRoom(room) {
  roomSocket.emit('joinRoom', { room, toLeave: currentRoom, nickName });
  currentRoom = room;
}
function sendMessage() {
  if (currentRoom === '') {
    alert('방을 선택해 주세요');
    return;
  }

  const message = $('#message').val();
  //메시지 초기화
  $('#message').val('');
  $('#chat').append(`<div>나 : ${message} </div>`);
  roomSocket.emit('message', { nickName, room: currentRoom, message });
  return false;
}
function createRoom() {
  const room = prompt('생성하실 방의 이름을 입력해주세용 : ');
  socket.emit('createRoom', { nickName, room });
}
roomSocket.on('clear', () => {
  $('#chat').empty();
});
roomSocket.on('message', (data) => {
  console.log(data);
  $('#chat').append(`${data}`);
});
socket.on('notice', (data) => {
  console.log(`${data}`);
  $('#notice').append(`<div>${data}</div>`);
});
socket.on('rooms', (rooms) => {
  console.log(rooms);
  $('#rooms').empty();
  rooms.forEach((room) => {
    $('#rooms').append(
      `<li>${room}<button onclick="joinRoom('${room}')"> 입장하기</button></li>`,
    );
  });
});
socket.on('connect', () => {
  console.log('Connected to Server');
  console.log(socket);
  socket.emit('getRooms');
});
