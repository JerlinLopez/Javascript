const todoList = [{
 name :  'make dinner', 
 dueDate : '2023-04-22'
},
{
  name : 'wash dishes',
  dueDate : '2023-04-24'
 }
];

renderTodoList();

function renderTodoList(){
  let todolistHTML = '';

  for(let i = 0; i < todoList.length; i++){
    const todoObject = todoList[i];
 
    const {dueDate ,name} = todoObject;      //shortcut of below lines
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const html = 
    `<div>${name}</div>
    <div>${dueDate}</div> 
    <button class = "red-btn" onclick="
    todoList.splice(${i} , 1)
    renderTodoList();
    ">Delete</button>`;
    todolistHTML += html;
  
  }
  
  document.querySelector('.js-todo-list').innerHTML = todolistHTML
}


function addTodo(){
  const inputElement = document.querySelector('.js-name-input'); 
  const name =  inputElement.value
  const dateinputElement = document.querySelector('.js-due-date-input')
  const dueDate = dateinputElement.value
//  console.log(name);

 todoList.push({
  name : name , 
  dueDate : dueDate
});


 inputElement.value = '';
dateinputElement.value = '';

 renderTodoList();

 saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// for(let i = 0; i < todoList.length; i++){
//   const arraylist = todoList[i];
//   document.querySelector('.display-todolist').innerHTML = 
//   // console.log(arraylist);
//  }