//Находим  элементы на странице 
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

//Добавление задачи 
form.addEventListener('submit', addTask);

//Удаление задачи 
tasksList.addEventListener('click', deleteTask);

//Функции 
function addTask( event){

//Отменяем отправку формы 
event.preventDefault();  
    
//Достаем текст задачт из поля ввода
const taskText = taskInput.value;


//Формируем разметку для новой задачи 
const taskHTML = `
<li class="list-group-item d-flex justify-content-between task-item">
                <span class="task-title">${taskText}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
            </li>
`;

//добавляем задачу на страницу
tasksList.insertAdjacentHTML('beforeend', taskHTML);

//Очищаем поле ввода и возвращаем на него фокус
//Очистили 
taskInput.value = ""
//возвращаем на него фокус
taskInput.focus()
//Если в списке задач больше одного элемента то скрывается надпись "Список дел пуст"
if (tasksList.children.length > 1 ){
    emptyList.classList.add('none')};

}

function deleteTask (event){
    console.log('delet')
}
