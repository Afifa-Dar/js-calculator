// import { io } from "socket.io-client";

 const socket = io('http://localhost:3000');

// $(document).ready(function(){

// //     alert('Im working');
  
//   });

const yourName = prompt('enter your name!');
//socket.emit('connection')
const chatbox = document.querySelector('.chatBox');
const text = document.getElementById('text');


const chat = document.getElementById('chat')
chat.addEventListener('submit' , e => {
    e.preventDefault()
    const data = {
        msg : text.value ,
        user : yourName
    }
    text.value = ""
    fetch('/msg',{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
    })
    .then( () =>console.log('welcom'))
           

})
function display()
    {
        console.log('hello')
        chatbox.innerHTML = ""
        fetch('/msg')
        .then(response => response.json())
        .then(data  => {
            for( i of data ){
                 const message = $(`<div></div>`).addClass("sender rounded-1 p-1 ")


                if(i.user == yourName) {
                        message.addClass("ms-auto ")
                        message.append(`you:   ${i.msg}`)
                }
                else {
                    message.append(`${i.user}:   ${i.msg}`)
                }
                
                 $(chatbox).append(message)
            }
        })
        .then(() => setTimeout(display , 3000))
    
    }
display();

