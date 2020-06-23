const socket = io();

let message = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let btn = document.getElementById('enviar');
let output = document.getElementById('output');
let action = document.getElementById('action');



btn.addEventListener('click',function(){
    //console.log(message.value,usuario.value);
    socket.emit('chat:message',{
        usuario : usuario.value,
        mensaje : message.value
    });
});

message.addEventListener('keypress',function(){
    socket.emit('chat:typing',usuario.value);
});

socket.on('chat:send',function(data){
    action.innerHTML = '';
    output.innerHTML +=`
    <p>
    <strong>${data.usuario}</strong> : ${data.mensaje}
    </p>
    `;
});

socket.on('chat:typingEnv',function(data){
    action.innerHTML = `<p> <em>${data}</em> esta escribiendo</p>`;
});