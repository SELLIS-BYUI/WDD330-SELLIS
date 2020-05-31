var list = document.querySelector('.list');
const input = document.querySelector('.inputValue');
const button = document.querySelector('.buttonClick');
const activeFilterButton = document.querySelector('.activeButton');
var toDoIndex = 0;

// creates our new item
const createToDo = (e) => {
e.preventDefault();

var toDoItem = {   id: new Date().getTime(),   
    content : input.value,  
    completed : false  
};


localStorage.setItem("id" + toDoIndex, JSON.stringify(toDoItem));
toDoIndex++;

displayToDo();
}

// the checkbox and marking as completed...
const completeToDo = (checkBoxId) => {
    var num = checkBoxId.slice(8, 9);   
    var item = JSON.parse(localStorage.getItem("id" + num));
    item.completed = true;

    localStorage.setItem("id" + num, JSON.stringify(item));
}

// the remove button 
const removeToDo = (removeBoxId) => {
    var num = removeBoxId.slice(9, 10);
    localStorage.removeItem("id" + num);


    displayToDo();
}


// const filterButton = (e) => {

// }

// displays the list of items and append the list dynamically
const displayToDo = () => {

    list.innerHTML = '';
    var arrayOfKeys = Object.keys(localStorage);

    for (var i = 0; i < arrayOfKeys.length; i++){
        var key = arrayOfKeys[i];
       var item = JSON.parse(localStorage.getItem(key)); 
       var k = key.slice(2, 3); 
       var listItem = document.createElement("LI"); // parent
       var createText = document.createTextNode(item.content);// child
       listItem.appendChild(createText); //append child to parent

       //adding a checkbox button to the todo task
       var checkBox = document.createElement("INPUT");
       checkBox.setAttribute("type", "checkbox");
       checkBox.setAttribute("id", "checkbox" + k);
       //trying to implement touch for like iphone or touch screens
       checkBox.setAttribute("ontouchend", "completeToDo('checkbox" + k + "')");
       listItem.appendChild(checkBox);
        // to append to another first, parent then child

       list.appendChild(listItem); // append parent to grand parent

       //adding a remove button to the todo task
       var removeBox = document.createElement("BUTTON");
       removeBox.innerHTML = "X";
       removeBox.setAttribute("type", "button");
       removeBox.setAttribute("id", "removeBox" + k);
       removeBox.setAttribute("ontouchend", "removeToDo('removeBox" + k + "')");
       listItem.appendChild(removeBox);
        // to append to another first, parent then child

       list.appendChild(listItem);
        
    }   
}
button.addEventListener('click', createToDo);
// activeFilterButton.addEventListner('click', filterButton);