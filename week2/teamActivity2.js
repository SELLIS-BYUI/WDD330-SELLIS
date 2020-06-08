var clickBtn = document.getElementById("click");
clickBtn.addEventListener("click", getNum1);
clickBtn.addEventListener("click", getNumTwoAdd);


function getNum1() {
    var num1 = document.getElementById('input1').value;
    document.getElementById('outPut').innerHtml = num1;
}
function getNumTwoAdd() {
    var num1 = document.getElementById('input1').value;
    var num2 = document.getElementById('input2').value;
    
    var numCheck1 = parseInt(num1);
    var numCheck2 = parseInt(num2);

    var total = 0;

    if(numCheck1 !== NaN && numCheck2 !== NaN){
        for (var i = 0; i <= numCheck2; i++) {
            total += i;
            document.getElementById("outPut2").innerHTML = total;
        }
    };
    var grandTotal = numCheck1 + numCheck2;
    document.getElementById('total').innerHTML = grandTotal;
       
}

