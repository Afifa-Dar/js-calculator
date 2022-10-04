
// $(document).ready(function(){

//     alert('Im working');
  
//   });

const yourName = prompt('enter your name!');
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
            // .then(response => response.json())
            // .then(data  => msg.innerHTML += data)

})
function display()
    {
        console.log('hello')
        chatbox.innerHTML = ""
        fetch('/msg')
        .then(response => response.json())
        .then(data  => {
            for( i of data ){
                // const container = document.createElement("div").classList.add("sender", "text-white", 'rounded-1', "p-1")
                // const sender = document.createElement('span')
                // const message = document.createElement('span')
                const message = $(`<div></div>`).addClass("sender rounded-1 p-1 ")


                if(i.user == yourName) {
                        message.addClass("ms-auto ")
                //     sender.appendChild(document.createTextNode('you: '))
                //     message.appendChild(document.createTextNode(`${i.message}`))
                        message.append(`you:   ${i.msg}`)
                }
                else {
                    message.append(`${i.user}:   ${i.msg}`)
                    // message.innerHTML+=i.msg
                }
                // container.appendChild(sender)
                // container.appendChild(message)
                 $(chatbox).append(message)
            }
        })
        .then(() => setTimeout(display , 3000))
    
    }
display();

