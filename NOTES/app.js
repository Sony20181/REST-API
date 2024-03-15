
document.getElementById('addTodo').addEventListener('click', async () => {
    const input = document.getElementById('todoText');
    const title = input.value;

    if (title){
        const res = await fetch('https://jsonplaceholder.typicode.com/todos',{ // запрос на публикацию(добавления)
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title,completed:false})
        });
        const todo = await res.json(); //когда зарпос выполнится, нужно прочитать его ответ
        todoToHtml(todo);
        input.value = '';
    }
})


async function gatAllTodos(){ // запрос на получения записей
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10'); // запрос на данные
    const todos = await res.json(); /// сами данные  
    console.log(todos)
    todos.forEach(todo =>  todoToHtml(todo));
}

window.addEventListener("DOMContentLoaded", gatAllTodos) // делает запрос когда страница загружена


function todoToHtml({id,completed,title}){
    const todoList = document.getElementById('todos');
    todoList.insertAdjacentHTML('beforeend',`
    <div class ="form-check" id = 'todo${id}'>
        <label class="form-check-label">
            <input class="form-check-input" type = "checkbox" ${completed && 'checked'} >
            ${title}
        </label>
        <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
`);

}

