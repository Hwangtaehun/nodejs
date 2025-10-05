const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
const nickname = prompt('닉네임을 입력해주세요.');
let currentRoom = '';

function sendMessage() {
  if (currentRoom === ''){
    alert('방을 선택해주세요.');
    return;
  }
  const message = $('#message').val();
  const data = { message, nickname, room: currentRoom };
  $('#chat').append(`<div>나 : ${message}</div>`);
  roomSocket.emit('message', data);
  return false;
}

socket.on('connect', () => {
  console.log('connected');
});

socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});

socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
});

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', { room, nickname });
}

roomSocket.on('message', (data) => {
  console.log(data);
  $('#chat').append(`<div>${data.message}</div>`);
});

roomSocket.on("rooms", (data) => {
  console.log(data);
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(`<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`);
  });
});

function joinRoom(room) {
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').html('');
  currentRoom = room;
}