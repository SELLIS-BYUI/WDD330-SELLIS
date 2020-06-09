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
    var grandTotal = numOneConvert + numTwoConvert;
    document.getElementById('sumTotal').innerHTML = 
    `Grand Total of Number one and two: ${grandTotal}`;
};