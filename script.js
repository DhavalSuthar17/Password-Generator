// fetching with custom attribute
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNum]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const copiedMsg = document.querySelector("[data-copiedMsg]");
const copybtn = document.querySelector("[data-copybtn]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck  = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*()_+<>?:"|:"=-`~'


let password = "";
let passwordLength = 10;
let checkCount = 0;
//set the strenth to grey color
handleSlider();
//set strength circle color to the grey 
setIndicator("#ccc");

// set passwordLength

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min ) * 100 / (max-min)) +"% 100%"


}


//set indicator color
function setIndicator (color){
    indicator.style.backgroundColor = color;
    //shadow do your self

    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndIntger(min , max){
    return (Math.floor(Math.random() * (max - min)) + min);
}

function generateRandomNumbers(){

    return getRndIntger(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRndIntger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRndIntger(65,91));
}

function generateSymbol(){

    const randomNum = getRndIntger(0,symbols.length);
     
    return symbols.charAt(randomNum);
    

}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum  = false;
    let hasSym = false;
     

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    } 
    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6){
        setIndicator("#ff0");

    }
    else{
        setIndicator("#f00");
    }
}


// copying to the clipboard


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copy" 

    }
    catch(e){
        copyMsg.innerText = "Failed";
    }

    // to make copy span visible

    copiedMsg.classList.add("active");

    setTimeout(() => {
        copiedMsg.classList.remove("active");
    } , 2000);
}


//handling the check box function

function handleCheckBoxChange() {
      checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount = checkCount + 1;
        } });

    //special condition

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

//adding event listener to the checkbox

allCheckBox.forEach((checkbox) => {

    checkbox.addEventListener('change', handleCheckBoxChange);
   

});


//function to suffle the password 
function shufflePassword(array){
    //Fisher Yates Method
    for(let i=array.length-1; i > 0 ; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => {str += el });
    return str;
}


//  adding event to the slider

inputSlider.addEventListener('input', (e) => {

    passwordLength = e.target.value;
    handleSlider();

});

// adding event to the copy button

copybtn.addEventListener('click',() => {
    if(passwordDisplay.value) copyContent();

    
})

  






//adding event listner to the generate button

generateBtn.addEventListener('click', () => {
    // none of the checkbox are selected

    if(checkCount == 0) return;
 
    if(passwordLength < checkCount){
     passwordLength = checkCount;
     handleSlider();
     
    }
 
    //codes to find new passwords
 
    //removing old password
    password = "";
    
 // creating a array to store all the charcater of password 
 
 let funcArr = [];
  
 if (uppercaseCheck.checked) funcArr.push(generateUppercase);
 if (lowercaseCheck.checked) funcArr.push(generateLowercase);
 if (numbersCheck.checked) funcArr.push(generateRandomNumbers);
 if (symbolCheck.checked) funcArr.push(generateSymbol);
 
 
 //cumpulsory addition for check character
 
 for(let i=0;i < funcArr.length; i++){
     password += funcArr[i]();
 }
 

 //remaining addtion 
 
 for(let i=0; i < passwordLength-funcArr.length ; i++){
     let rndmIndex = getRndIntger(0, funcArr.length);
     password += funcArr[rndmIndex]();
 }
  
 
 // shuffling the password
 
 password = shufflePassword(Array.from(password));


 
 // updating the ui
 passwordDisplay.value = password;

 
 
 //calculating the strength 
 calcStrength();
 
 
 } 
 );



