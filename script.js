const inputTypeTask = document.getElementById('texto-tarefa');
const createTaskBtn = document.getElementById('criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');

function createTask() {
  createTaskBtn.addEventListener('click', () => {
    const createItem = document.createElement('li');
    taskList.appendChild(createItem);
    createItem.innerText = inputTypeTask.value;
    inputTypeTask.value = '';
    createItem.innerHTML = "<label class='container'><input type='checkbox' class='checkbox'> <span class='checkmark'></span>" + createItem.innerText + "</label>";
    createItem.onclick = function (event) { event.path[0].checked ? createItem.classList.toggle('completed') : createItem.classList.remove('completed') }
  });
}
createTask();

taskList.addEventListener('click', (event) => {
  const select = document.querySelectorAll('.selected');
  for (let under = 0; under < select.length; under += 1) {
    select[under].classList.remove('selected');
    select[under].style.backgroundColor = '';
  }
  event.target.classList.add('selected');
  const getSelected = document.querySelector('.selected');
  getSelected.style.backgroundColor = 'rgb(128, 128, 128)';
});

const btnDeleteAllList = document.getElementById('apaga-tudo');
function deleteAllList() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.lastChild);
  }
}
btnDeleteAllList.addEventListener('click', deleteAllList);

const btnRmDone = document.getElementById('remover-finalizados');

function rmTaskDone() {
  const completed = document.querySelectorAll('.completed');
  for (let i = 0; i < completed.length; i += 1) {
    completed[i].remove();
  }
}
btnRmDone.addEventListener('click', rmTaskDone);

const btnSaveTask = document.getElementById('salvar-tarefas');
function saveTask() {
  localStorage.setItem(1, taskList.innerHTML);
}
btnSaveTask.addEventListener('click', saveTask);

function loadSaveTask() {
  taskList.innerHTML = localStorage.getItem(1);
}
loadSaveTask();

const btnMoveUp = document.getElementById('mover-cima');
btnMoveUp.addEventListener('click', () => {
  if (document.querySelector('.selected') === null) {
    return;
  }
  const getParentOfSelected = document.querySelector('.selected').parentNode;
  const getPreviousElemSibling = document.querySelector('.selected').previousElementSibling;
  const getElemSelected = document.querySelector('.selected');

  if (getPreviousElemSibling === null) {
    alert('Não é possível.');
  } else {
    getParentOfSelected.insertBefore(getElemSelected, getPreviousElemSibling);
  }
});

const btnMoveDown = document.getElementById('mover-baixo');
btnMoveDown.addEventListener('click', () => {
  if (document.querySelector('.selected') === null) {
    return;
  }
  const getParentOfSelected = document.querySelector('.selected').parentNode;
  const nextElemOfSelected = document.querySelector('.selected').nextElementSibling;
  const getElemSelected = document.querySelector('.selected');

  if (nextElemOfSelected === null) {
    alert('Não é possível.');
  } else {
    getParentOfSelected.insertBefore(nextElemOfSelected, getElemSelected);
  }
});

const btnDeleteSelected = document.getElementById('remover-selecionado');
btnDeleteSelected.addEventListener('click', () => {
  const taskSected = document.querySelectorAll('.selected');
  for (let until = 0; until < taskSected.length; until += 1) {
    taskSected[until].remove();
  }
});
