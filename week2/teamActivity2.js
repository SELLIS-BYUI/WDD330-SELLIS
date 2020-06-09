var clickBtn = document.getElementById("click");
clickBtn.addEventListener("click", getNumOne);
clickBtn.addEventListener("click", getNumTwo);
clickBtn.addEventListener("click", getTotal);

function getNumOne() {
    var numberOne = document.getElementById('inputOne').value;
    var numberTwo = document.getElementById('inputTwo').value;
    document.getElementById('outPutOne').innerHTML = 
    `First Number: ${numberOne}, <br>Second Number: ${numberTwo}`;
    
};

function getNumTwo() {
    var numberTwo = document.getElementById('inputTwo').value;
    var getSecondNumber = parseInt(numberTwo);
    var numTwoSumOf = 0;
    if(getSecondNumber !== NaN){
        for (var i = 0; i < getSecondNumber; i++) {
            numTwoSumOf += i;
        }
    }
    document.getElementById('outPutTwo').innerHTML = 
    `Add up from 1 till inputTwo: ${numTwoSumOf}`;
};

function getTotal() {
    var getNumOne = document.getElementById('inputOne').value;
    var getNumTwo = document.getElementById('inputTwo').value;
    var numOneConvert = parseInt(getNumOne);
    var numTwoConvert = parseInt(getNumTwo);
    document.getElementById('sumTotal').innerHTML = 
    `Grand Total of Number one and two: ${numOneConvert + numTwoConvert}`;
};

/**************************************************
 * This is our team effort with JavaScript. But have made changes to improve
 * skill and understand of advance JavaScript.
 * 
 * function names() {

   var num= document.getElementById("input").value;
   var result = numberSum(num);
    console.log(result);
    document.getElementById("name").innerHTML=result;

}

function numberSum(num) {
    console.log(num);
    var a;
    var total=0;
    for(i=0; i<=num; i++){
        total += i;
    }
    return total;

} 
 */