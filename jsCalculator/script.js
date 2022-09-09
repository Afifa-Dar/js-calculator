result = 0;
expression = "";
var clear = document.getElementById("clear")
var input = document.getElementById("input")
var cut = document.getElementById("cancel")
var equal = document.getElementById('equate')
//adding functionality to AC button
clear.addEventListener("click", () => input.innerHTML = "")

//adding funcitonality to cross button
cut.addEventListener("click" ,() => input.innerHTML = input.innerHTML.slice(0,-1))

//adding functionality to equal-to
equal.addEventListener("click",() => {
    expression = input.innerHTML;
    evaluate()
})

// get buttons
var button = document.querySelectorAll('button')

//when button click it add to inputBar
button.forEach(btn => btn.addEventListener("click", () => {
    if (btn.innerHTML !== clear.innerHTML && btn.innerHTML !== cut.innerHTML ) {
        input.innerHTML += btn.innerText
    }
}))

const operator = {"+":"plus", "-":"sub" ,"X":"mul" , "/":"div" , "^":"pow" , "%":"mod"}
console.log(operator)

var plus = (a , b) => {
    console.log(typeof a , typeof b, a,b)
    return a+b
}

function evaluate(){
    expression = expression.split("\n").join("")
    expression = expression.split(" ").join("")
while (expression)
   {
        let operand1="";
        let operand2="";
        let operation;
       for(i of expression){

        if(i in operator){
            operation = operator[i];
            break
        }
        operand1+=i
       }

       expression = expression.slice(expression.indexOf(i)+1,)

       for(i of expression){

        if(i in operator){
          break  
        }
        operand2+=i
       }
       console.log(operand2,operation)
       if(operation)
       doCalulation(Number(operand1) , Number(operand2),eval(operation))   
   } 
}

var doCalulation = (op1 , op2 , calc) => result=calc(op1,op2);

