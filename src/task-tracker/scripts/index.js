const taskInput = document.getElementById('taskInput');
const createBtn = document.getElementById('createBtn');
const tasksContainer = document.getElementById('tasksContainer');
const selectAllBtn = document.getElementById('selectAllBtn');
const trashBtn = document.getElementById('trashBtn');
const trashContainer = document.getElementById('trashContainer');
const restoreBtn = document.getElementById('restoreBtn');

createBtn.addEventListener('click', () => {
  const taskText = taskInput.value;
  if (taskText) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const taskTextElem = document.createElement('span');
    taskTextElem.textContent = taskText;
    taskElement.appendChild(taskTextElem);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    taskElement.appendChild(checkbox);

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        taskTextElem.classList.add('completed');
        deleteBtn.style.display = 'inline';
      } else {
        taskTextElem.classList.remove('completed');
        deleteBtn.style.display = 'none';
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.classList.add('delete');
    taskElement.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
      tasksContainer.removeChild(taskElement);
      trashContainer.appendChild(taskElement);
      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change'));
    });

    tasksContainer.appendChild(taskElement);

    taskInput.value = '';
  }
});

selectAllBtn.addEventListener('click', () => {
  const checkboxes = tasksContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
  });
});

trashBtn.addEventListener('click', () => {
  if (trashContainer.style.display === 'none') {
    trashContainer.style.display = 'block';
    trashBtn.textContent = 'Скрыть корзину';
  } else {
    trashContainer.style.display = 'none';
    trashBtn.textContent = 'Корзина';
  }
});

restoreBtn.addEventListener('click', () => {
  const checkboxes = trashContainer.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach((checkbox) => {
    const taskElement = checkbox.parentNode;
    trashContainer.removeChild(taskElement);
    tasksContainer.appendChild(taskElement);
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
  });
});
