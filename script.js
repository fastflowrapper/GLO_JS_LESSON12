'use strict';

let headerInput = document.querySelector('.header-input'),
todoControl = document.querySelector('.todo-control'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');

if (localStorage.todoData) {
    var todoData = JSON.parse(localStorage.todoData);
} else {
    var todoData = [];
}

let render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        if (item.value !== ''){
        let li = document.createElement('li');
        li.classList.add('todo-item');
        
            li.innerHTML = ' <span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

            if (item.completed){
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }

            li.querySelector('.todo-complete').addEventListener('click', function(){
                item.completed = !item.completed;
                render();
            });

            li.querySelector('.todo-remove').addEventListener('click', function(){
                item.value = '';
                render();
            });
        }
        
    });
    headerInput.value = '';

    let todoDataCleared = [];
    todoData.forEach(function(item){
        if (item.value !== ''){
            todoDataCleared.push(item);
        }
    });
    let jsonTodoData = JSON.stringify(todoDataCleared);
    localStorage.todoData = jsonTodoData;
};


todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    if (headerInput.value !== ''){
        let newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
    }
    

    render();
});

render();