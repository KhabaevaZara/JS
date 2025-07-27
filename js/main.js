//находим  элементы на странице 
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');

form.addEventListener('submit', function (event) {

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

})