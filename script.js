const inputTypeTask = document.getElementById('texto-tarefa');
const createTaskBtn = document.getElementById('criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const itemList = document.getElementsByClassName('item-list');
const lis = document.getElementsByTagName('li');

function createTask() {
  createTaskBtn.addEventListener('click', () => {
    const createItem = document.createElement('li');
    const span = document.createElement('span');
    const txt = document.createTextNode('\u00D7');
    taskList.appendChild(createItem);
    createItem.innerText = inputTypeTask.value;
    inputTypeTask.value = '';
    createItem.classList = 'item-list';
    createItem.innerHTML = "<label class='container'><input type='checkbox' class='checkbox'><span class='checkmark'></span><p>" + createItem.innerText + "</p></label>";
    span.className = 'close';
    span.appendChild(txt);
    createItem.appendChild(span);
    createItem.onclick = function (event) {
      event.path[0].checked ? createItem.classList.toggle('completed') : createItem.classList.remove('completed');
      createItem.addEventListener('dblclick', (event) => {
        getSelected(event);
      });
    }
    getItemDisplayNone();
  });
}
createTask();


const getSelected = (event) => {
  const select = document.querySelectorAll('.selected');
  for (let under = 0; under < select.length; under += 1) {
    select[under].classList.remove('selected');
    select[under].style.backgroundColor = '';
  }
  event.path[2].classList.add('selected');
  const getSelected = document.querySelector('.selected');
  getSelected.style.backgroundColor = 'rgb(128, 128, 128)';
}

const getChangesTask = () => {
  if (localStorage.getItem('List') !== null) {
    console.log('entrou');
    localStorage.removeItem('List');
    let tarefas = JSON.parse(localStorage.getItem('List')) || [];
    Object.keys(lis).forEach((item) => {
      tarefas.push(lis[item].firstChild.lastChild.innerHTML)
    })
    console.log(tarefas);
    localStorage.setItem('List', JSON.stringify(tarefas))
  }
}

const getItemDisplayNone = () => {
  const close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i += 1) {
    close[i].onclick = function () {
      const li = this.parentElement;
      li.parentNode.removeChild(li);
      getChangesTask();
    }
  }
}

const btnDeleteAllList = document.getElementById('apaga-tudo');
function deleteAllList() {
  if (window.confirm('Você tem certeza que quer apagar todas as tarefas?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.lastChild);
    }
    localStorage.removeItem('List');
  }
}
btnDeleteAllList.addEventListener('click', deleteAllList);

const btnRmDone = document.getElementById('remover-finalizados');

function rmTaskDone() {
  const completed = document.querySelectorAll('.completed');
  for (let i = 0; i < completed.length; i += 1) {
    completed[i].remove();
  }
  getChangesTask();
}
btnRmDone.addEventListener('click', rmTaskDone);

const btnSaveTask = document.getElementById('salvar-tarefas');
function saveTask() {
  const tarefas = JSON.parse(localStorage.getItem('List')) || [];
  Object.keys(lis).forEach((item) => {
    tarefas.push(lis[item].firstChild.lastChild.innerHTML);
  });
  const filteredTasks = tarefas.filter((task, i) => tarefas.indexOf(task) === i);
  localStorage.setItem('List', JSON.stringify(filteredTasks));
}
btnSaveTask.addEventListener('click', saveTask);

function loadSaveTask() {
  const tarefas = JSON.parse(localStorage.getItem('List'));
  tarefas.forEach((item) => {
    const createItem = document.createElement('li');
    const span = document.createElement('span');
    const txt = document.createTextNode('\u00D7');
    createItem.innerText = item;
    createItem.classList = 'item-list';
    createItem.innerHTML = "<label class='container'><input type='checkbox' class='checkbox'><span class='checkmark'></span><p>" + createItem.innerText + "</p></label>";
    span.className = 'close';
    span.appendChild(txt);
    createItem.appendChild(span);
    taskList.appendChild(createItem);
    createItem.onclick = function (event) {
      event.path[0].checked ? createItem.classList.toggle('completed') : createItem.classList.remove('completed');
      createItem.addEventListener('dblclick', (event) => {
        getSelected(event);
      });
    }
  })
  getItemDisplayNone();
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
  const selected = document.getElementsByClassName('selected');
  selected[0].classList.add('animate__animated', 'animate__backOutRight');
  for (let until = 0; until < selected.length; until += 1) {
    selected[until].remove();
  }
  getChangesTask();
});
