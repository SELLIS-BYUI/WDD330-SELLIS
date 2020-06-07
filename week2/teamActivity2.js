function names() {

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