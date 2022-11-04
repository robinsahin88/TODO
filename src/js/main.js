import { Task } from "./models/class";

window.addEventListener("load", () => {
    myTaskArray = JSON.parse(localStorage.getItem("myTaskArray")).map((addedTask)=>{
        return new Task(addedTask.text, addedTask.id);
    });

    displayList();
})


let myTaskArray = [];

let todoInput = document.getElementById("todo-input");
let todoButton = document.getElementById("todo-button");
let todoList= document.getElementById("todo-list");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

function addTodo(event) {
    event.preventDefault();

    let addedTask= new Task (todoInput.value, Math.random());

    if (todoInput.value ==="") {
        alert("Du måste skriva något först")
        return false;
    }

    else {
        
        myTaskArray.push(addedTask);
        addToLocalStorage();
        todoInput.value = "";
        displayList();
    }
   
    
}

function displayList() {

    todoList.innerHTML="";
    for(let i = 0; i < myTaskArray.length; i++) {
        let todoDiv = document.createElement("div");
        todoDiv. classList.add("todo");
        todoList.appendChild(todoDiv);
        
        let newTodo = document.createElement("li");
        newTodo.innerText = myTaskArray[i].text;
        newTodo.classList.add("todo__item");
        todoDiv.appendChild(newTodo);
    
        let completedButton = document.createElement("button");
        completedButton.innerHTML= '<i class="bi bi-check2-square"></i>';
        completedButton.classList.add("todo__completeBtn");
        todoDiv.appendChild(completedButton);
    
        let trashButton = document.createElement("button");
        trashButton.innerHTML= '<i class="bi bi-trash"></i>';
        trashButton.classList.add("todo__trashBtn");
    
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    
        trashButton.addEventListener("click", () => {
            myTaskArray.splice([i],1);
            localStorage.setItem("myTaskArray", JSON.stringify(myTaskArray))
        });
    }

}

function deleteCheck(event) {
    let item = event.target;

    if (item.classList[0] === "todo__trashBtn") {
    let todo = item.parentElement;
    todo.remove();
    }

    if(item.classList[0] === "todo__completeBtn") {
    let todo = item.parentElement;
    todo.classList.toggle("completed"); //skapa css .completed för toggle
    }

}

function addToLocalStorage() {
    let myLSArray = JSON.stringify(myTaskArray);
    localStorage.setItem("myTaskArray", myLSArray);
}

function clearAll () {
 
localStorage.clear();
window.location.reload();

}

let deleteAllBtn = document.getElementById("deleteAll");
deleteAllBtn.addEventListener("click", clearAll);
