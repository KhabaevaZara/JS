//  ОСНОВНЫЕ ЭЛЕМЕНТЫ ИНТЕРФЕЙСА 

// Форма для добавления новых задач
const form = document.querySelector('#form');

// Поле ввода текста задачи
const taskInput = document.querySelector('#taskInput');

// Контейнер списка задач
const tasksList = document.querySelector('#tasksList');

// Блок "Список дел пуст"
const emptyList = document.querySelector('#emptyList');




// ЭЛЕМЕНТЫ СТАТИСТИКИ 
const totalTasksEl = document.getElementById('totalTasks');
const activeTasksEl = document.getElementById('activeTasks');
const completedTasksEl = document.getElementById('completedTasks');

// Массив для хранения задач
let tasks = [];




// ОБРАБОТЧИКИ СОБЫТИЙ 

// Добавление новой задачи
form.addEventListener('submit', addTask);

// Удаление и отметка задач
tasksList.addEventListener('click', handleTaskAction);

// ЗАГРУЗКА ПРИЛОЖЕНИЯ 
document.addEventListener('DOMContentLoaded', function() {

    // Проверяем наличие сохраненных задач в localStorage
    if (localStorage.getItem('tasks')) {

        // Парсим данные из JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
        renderTasks();
    } else {
        // Стартовый набор задач 
        // tasks = [
        //     { id: 1, text: 'Запланировать встречу с командой', completed: false },
        //     { id: 2, text: 'Подготовить презентацию', completed: true },
        //     { id: 3, text: 'Изучить новые технологии разработки', completed: false },
        //     { id: 4, text: 'Сделать рефакторинг кода', completed: false },
        //     { id: 5, text: 'Купить продукты', completed: true }
        // ];
        saveTasks();
        renderTasks();
    }
});




// ФУНКЦИЯ ДОБАВЛЕНИЯ ЗАДАЧИ 
function addTask(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы
    
    // Получаем и очищаем текст задачи
    const taskText = taskInput.value.trim();
    
    // Проверяем, что поле не пустое
    if (!taskText) return;
    
    // Создаем объект задачи
    const newTask = {
        id: Date.now(), // Уникальный ID на основе времени
        text: taskText,
        completed: false // Статус выполнения
    };
    
    // Добавляем задачу в массив
    tasks.push(newTask);
    saveTasks();    // Сохраняем в localStorage
    renderTasks();  // Перерисовываем список
    
    // Сбрасываем поле ввода
    taskInput.value = '';
    taskInput.focus(); // Возвращаем фокус
    
    // Анимация кнопки добавления
    const addButton = document.querySelector('.btn-primary');
    addButton.classList.add('pulse');
    setTimeout(() => addButton.classList.remove('pulse'), 500);
}



// ОБРАБОТЧИК ДЕЙСТВИЙ С ЗАДАЧАМИ 
function handleTaskAction(event) {

    // Определяем элемент, на котором произошел клик
    const target = event.target;
    
    // Проверяем, что клик был по кнопке действия
    const actionBtn = target.closest('.btn-action');
    if (!actionBtn) return;
    
    // Находим родительский элемент задачи
    const taskItem = actionBtn.closest('.task-item');
    const taskId = Number(taskItem.dataset.id); // Получаем ID задачи
    const action = actionBtn.dataset.action;    // Тип действия
    
    // Обработка разных типов действий
    if (action === 'done') {
        toggleTaskStatus(taskId); // Переключаем статус
    } else if (action === 'delete') {
        // Анимация удаления
        taskItem.style.transform = 'translateX(100px)';
        taskItem.style.opacity = '0';
        // Удаление после завершения анимации
        setTimeout(() => deleteTask(taskId), 300);
    }
}



//  ПЕРЕКЛЮЧЕНИЕ СТАТУСА ЗАДАЧИ 
function toggleTaskStatus(taskId) {
    // Обновляем статус задачи в массиве
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks(); // Обновляем отображение
}




// УДАЛЕНИЕ ЗАДАЧИ 
function deleteTask(taskId) {
    // Фильтруем массив, удаляя задачу
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks(); // Обновляем отображение
}




//  СОХРАНЕНИЕ ЗАДАЧ В LOCALSTORAGE 
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStatistics(); // Обновляем статистику
}



//  ОТОБРАЖЕНИЕ СПИСКА ЗАДАЧ 
function renderTasks() {

    // Проверка на пустой список
    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <li id="emptyList" class="list-group-item empty-list">
                <i class="far fa-smile-beam"></i>
                <div class="empty-list__title">Список дел пуст</div>
                <div class="empty-list__subtitle">Добавьте свою первую задачу</div>
            </li>
        `;
    } else {

        // Очищаем контейнер
        tasksList.innerHTML = '';
        
        // Генерируем HTML для каждой задачи
        tasks.forEach(task => {

            // Определяем класс для завершенных задач
            const taskClass = task.completed ? 'task-title--done' : '';
            
            // Формируем разметку задачи
            const taskHTML = `
            <li class="list-group-item task-item" data-id="${task.id}">
                <span class="task-title ${taskClass}">${task.text}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action done-btn">
                        <i class="fas fa-check"></i>
                    </button>
                    <button type="button" data-action="delete" class="btn-action delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
            `;

            // Добавляем задачу в список
            tasksList.insertAdjacentHTML('beforeend', taskHTML);
        });
    }
    updateStatistics(); // Обновляем статистику
}



// ОБНОВЛЕНИЕ СТАТИСТИКИ 
function updateStatistics() {
    // Расчет показателей
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    
    // Обновление элементов интерфейса
    totalTasksEl.textContent = total;
    activeTasksEl.textContent = active;
    completedTasksEl.textContent = completed;
    
    // Анимация изменений
    [totalTasksEl, activeTasksEl, completedTasksEl].forEach(el => {
        el.style.transform = 'scale(1.2)';
        setTimeout(() => el.style.transform = 'scale(1)', 300);
    });
}