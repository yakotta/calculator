// JavaScript File

var result = document.getElementById("result");

function resetValues(){
    return ["",""];
}

var placeHolder = "✿";
var value = resetValues();
var valueIndex = 0;
var action = null;

document.addEventListener("keyup",function(event){
    var key = event.keyCode;
    
    if (key >= 48 && key <= 57) {
        updateNumber(String.fromCharCode(key));
    } else if (key == 8) {
        deleteLastEntry();
    } else if (key == 80 || key == 77 || key == 84 || key == 68) {
        var operators = {
            80: "addition", //p
            77: "subtraction", //m
            84: "multiplication", //t
            68: "division", //d
        }
        updateOperator(operators[key]);
    } else if (key == 13) {
        compute();
    } else if (key == 27) {
        resetCalculator();
        result.textContent = placeHolder;
    }

    // console.log(key,event.key,String.fromCharCode(event.keyCode),event);
},false);

function updateNumber(number) {
    value[valueIndex] = value[valueIndex] + number;
    result.textContent = value[valueIndex];
}

function updateOperator(operator) {
    valueIndex=1;
    action = operator;
}

function compute() {
    if (action != null) {
        result.textContent = JennaMath[action](Number(value[0]),Number(value[1]));
    } else {
        result.textContent = "Please select an operation you fucking idiot.";
    }
    resetCalculator();
}

function resetCalculator() {
    value = resetValues();
    valueIndex = 0;
    action = null;
}

function deleteLastEntry() {
    var temp = value[valueIndex].split("");
    temp.pop();
    temp = temp.join("");

    if (temp == "") {
        value[valueIndex] = "";
        result.textContent = placeHolder;
    } else {
        value[valueIndex] = temp;
        result.textContent = value[valueIndex];    
    } 
}

var buttonNumber = document.querySelectorAll('button.number');
for(let i=0;i<buttonNumber.length;i++){
    buttonNumber[i].addEventListener("click",function(event){
        updateNumber(event.target.textContent);
        //console.log("Number clicked", Number(value[0]), Number(value[1]), event.target.textContent );
    },false);
}

var buttonOperator = document.querySelectorAll('button.operator');
for(let i=0;i<buttonOperator.length;i++){
    buttonOperator[i].addEventListener("click",function(event){
        updateOperator(event.target.name);
        // console.log("Operator clicked",action);
    },false);
}

var buttonEquals = document.querySelector('button.equals');
if (buttonEquals != null){
    buttonEquals.addEventListener("click",function(event){
        //console.log("Equals clicked",event.target.textContent);
        compute()
    },false);
}

var JennaMath = {
    addition: function(a,b) {
        return a+b;
    },
    
    subtraction: function(a,b) {
        return a-b;
    },
    
    multiplication: function(a,b) {
        return a*b;
    },
    
    division: function(a,b) {
        return a/b;
    },
}