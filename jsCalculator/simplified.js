//define operators
const operator = {
    plus : (a , b) => a + b ,
    sub : (a , b) => a - b ,
    mul : (a , b) => a * b ,
    mod : (a , b) => a % b ,
    pow : (a , b) => a ** b ,
    div : (a , b) =>{
        if (b == 0){
            return "Cant divide by zero"
        }
        else {
            return a / b
        }
     }
}
// get elements
var button = document.querySelectorAll('button')   //all buttons
var clear = document.getElementById("clear")
var input = document.getElementById("input")
var cut = document.getElementById("cancel")
var equal = document.getElementById('equate')

//styling elements
document.getElementById('clear').style.color = "#739394"


//decalaration
var flag
var operand1; 
var operand2;
var  operation; 
var temp ='' ;
var operatorTemp;



// functions defination  

const clearHistory = () =>{
    operand1 = undefined;
    operatorTemp = undefined
    operand2 = undefined ;
    operation = undefined;
    temp = ""
}


const doCalc = (op1 , op2 , calc) => {
     res = calc(op1 , op2)

    if(res == "Cant divide by zero"){   //user try to div number by 0
        clearHistory()    
        flag = -1
        input.innerHTML=res       //show error
    }
    else{                  //all goes fine
    operand1 = res ;      //set 1st operand to computed value
    operation = operatorTemp
    if (operatorTemp)    //if another operator after result computed 
    {
        res = res + input.innerHTML.slice(-1)   //show in inputBar
    }

    input.innerHTML = res      //show computed value to input bar

    operatorTemp = undefined   //reset operatorTemp
    operand2 = undefined;     //reset 2nd operand
    temp = ""                 //reset temp , to re-get value for 2nd operand
    }
}

const buttonPressed = function(e)
{
    let btn = e.target
    // set 2nd operand value
    if (btn.value in operator && operand1 !== undefined){
        if(temp == ''){     //if user overwrite operator 
            operation = btn.value
            input.innerHTML = input.innerHTML.slice(0,-1)
        }
        else{
        operand2 = temp;
        operatorTemp = btn.value
        }
    }
    // set 1st operand value
    else if ((btn.value in operator) && (operand2 === undefined)){
        operand1 = input.innerHTML;
        operation = btn.value

    }
    // show value to input bar except AC , x (cross) , =
    if (btn.innerHTML !== clear.innerHTML && btn.innerHTML !== cut.innerHTML && btn.innerHTML !== equal.innerHTML)
     {
        if(flag !== undefined)  // if history was clear
         {
            if(btn.value in operator)   //if  user press operator once history clear
            {
                if(flag == -1)      //all clear
                {
                    input.innerHTML = '0'
                }
                else     
                {                     //res was store
                    input.innerHTML = res;
                }
            }
           else{
                input.innerHTML=btn.value  //initilize inputbar to  input
           }
            
            flag = undefined   //reset flag
         }
         // get value for 2nd operand and store it in temp until user press another operator
        if (operand1 !== undefined && !(btn.value in operator)){
            temp+=btn.innerText
        }
        input.innerHTML += btn.innerText   //addd value to input
    }  
    // if both operand , then perfrom operation
    if (operand1 !== undefined && operand2 !== undefined && operation !== undefined)
    {
        doCalc(Number(operand1),Number(operand2),operator[operation])

    }
}

// add events to elements


//adding functionality to AC button
clear.addEventListener("click", () =>{ 
    input.innerHTML = "";
    clearHistory();
    flag = -1
})
//adding funcitonality to cross button
cut.addEventListener("click" ,() => {
    input.innerHTML = input.innerHTML.slice(0,-1)
    if(temp.length != 0){    //if user want to modified 2nd operand
        console.log('op2')
        temp = temp.slice(0,-1)
        console.log(temp)
    }
    else if(operation !== undefined){   //if user want to modified operator
        console.log('op')
        operation = undefined;
        operand1 = undefined;
    }
})

//adding functionality to equal-to
equal.addEventListener("click",() => {
    operand2 = temp;
    doCalc(Number(operand1),Number(operand2),operator[operation])
    clearHistory();
    if(!flag) flag = 1             //if no error

})

//add click event to button
button.forEach(btn => btn.addEventListener("click",buttonPressed ))

