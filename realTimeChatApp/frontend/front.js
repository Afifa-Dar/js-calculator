
const yourName = prompt('enter your name!')
const send = document.getElementById('a')
const rec = document.getElementById('b')
const chatbox = document.querySelector('.chatBox')
const text = document.getElementById('text')

import $ from "jquery";

const chat = document.getElementById('chat')
chat.addEventListener('submit' , e => {
    e.preventDefault()
    const data = {
        msg : text.value ,
        user : yourName
    }
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
        //chatbox.innerHTML = ""
        fetch('/msg')
        .then(response => response.json())
        .then(data  => {
            for( i of data ){
                console.log(i)
                // const container = document.createElement("div").classList.add("sender", "text-white", 'rounded-1', "p-1")
                // const sender = document.createElement('span')
                // const message = document.createElement('span')
                const message = $(chatbox).add(`<div></div>`).addClass("text-white rounded-1 p-1")


                if(i.user == yourName) {
                //     sender.appendChild(document.createTextNode('you: '))
                //     message.appendChild(document.createTextNode(`${i.message}`))
                        $(message).add(`you : ${i.msg}`)
                }
                else {
                    // message.addClass("ms-auto")
                    // message.innerHTML+=`<span>${i.user}: </span>`
                    // message.innerHTML+=i.msg
                }
                // container.appendChild(sender)
                // container.appendChild(message)
                 $(chatbox).add(message)
            }
        })
        .then(() => setTimeout(display , 3000))
    
    }
display()

