let nums = document.getElementById("length");
let count = document.getElementById("count")
   
//event for input length count     
nums.addEventListener("input",function(){
   //current input value stored in length
    let length = this.value;
  //used value attribute in input tag for count
    count.value = length;
});
//DOM elements
const resultEl = document.getElementById("result");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const symbolsEl = document.getElementById("symbols");
const numbersEl = document.getElementById("numbers");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

//functions for generators

let getRandomLower = ()=> String.fromCharCode(Math.floor(Math.random() * 26) + 97);
//console.log(getRandomLower());

let getRandomUpper = ()=> String.fromCharCode(Math.floor(Math.random() * 10) + 65);
//console.log(getRandomUpper());

let getRandomNumber = ()=> String.fromCharCode(Math.floor(Math.random() * 10) + 48);
//console.log(getRandomNumber());

let getRandomSymbol = (symbols)=>{
    symbols = '!~@#$%&*(){}][?/<,>.';
    return symbols[Math.floor(Math.random() * symbols.length)]
};
//console.log(getRandomSymbol());

//object for all functions property
const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
};
// click event to generate button
generateEl.addEventListener('click',() => {
    const length = parseInt(nums.value);
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
   resultEl.innerHTML = generatePassword( hasUpper,hasLower,hasNumber,hasSymbol,length);
});

//function with  generate event variables as a parameters
function generatePassword(upper,lower,number,symbol,length){
//1. initialise pass var, 2. filterout notchecked, 3.loop to access length for gen function, 4.final pass var and return
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
  //  console.log('typesCount: '+ typesCount);
    const typesArr = [{upper},{lower},{number},{symbol}].filter(item => Object.values(item)[0]);
  //  console.log("typesArr: ", typesArr);
    if(typesCount === 0){
       return ''; 
    }
    for(let i = 0; i<length; i+=typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }   const finalPassword = generatedPassword.slice(0,length);
        return finalPassword;
}
//copy to clipboard function
clipboardEl.addEventListener('click',()=>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    if(!password){
        return ;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password copied to clipboard!");
});
const reset = document.getElementById("reset")
reset.addEventListener('click',()=>{
    resultEl.innerText= 'Random Password';
});