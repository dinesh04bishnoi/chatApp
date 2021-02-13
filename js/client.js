const socket = io('http://localhost:8000');
 //get dom element in a js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//audio that wil play after receive message
var audio = new Audio('ting.mp3');

//functio which will append event info to the container
const append = (message,position)=>{
const messageElement = document.createElement('div');
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position == 'left'){
audio.play();
}
}

//ask new user name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

//if the new user join  recive his name from the server
socket.on('user-joined', name=>{
    append(`${name } joined the chat`, 'right')
})

//if server send a message, receive it
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

//if a user leave the chat append the info to the container
socket.on('left', name=>{
    append(`${name} left the chat`, 'right')
})

//if the form get submitted , send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message == ''){
        console.error(err);
    }
    else{
        append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = ''

    }
    
})