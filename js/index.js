const baseContainer = document.querySelector('div.app-container');

baseContainer.classList.add("vh-100", "w-100", "d-flex", "align-items-center", "justify-content-center", "flex-column");
const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
};
const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
};
const createTitle = () => {
    const h3 = document.createElement('h3');
    h3.classList.add('title');
    h3.textContent = `Todo App`;
    return h3;
};
const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
};
const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });
    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
};
const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    const form = document.createElement('form');
    form.classList.add('form', 'd-flex', 'align-items-center', 'mb-3');
    const label = document.createElement('label');
    label.classList.add('form-group', 'me-3', 'mb-0');
    label.htmlFor = "task";
    const input = document.createElement('input');
    input.setAttribute('placeholder','ввести задачу');
    input.setAttribute('id', 'task');
    input.setAttribute('required', '');
    input.type = 'text';
    input.name = 'task';
    input.classList.add('form-control');
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary me-3',
        type: 'submit',
        name: 'button',
        text: 'Сохранить',
      },
      {
        className: 'btn btn-warning',
        type: 'reset',
        name: 'button',
        text: 'Очистить',
      },
    ]);
    label.append(input);
    form.append(label, ...buttonGroup.btns);
    overlay.append(form);
    return {
      overlay,
      form,
    };
}
const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
      </tr>
      `);
    const tbody = document.createElement('tbody');
    tbody.classList.add('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;
    return table;
};

const createRow = function({task: task, state: state}) {
    const trElement = document.createElement('tr');
    const tr = document.querySelectorAll('.task_row');
    const trCount = tr.length + 1;
    trElement.classList.add('task_row');
    const tdNum = document.createElement('td');
    tdNum.classList.add('task_number');
    tdNum.textContent = trCount;
    const tdTask = document.createElement('td');
    tdTask.classList.add('task');
    tdTask.textContent = task;
    const tdStatus = document.createElement('td');
    tdStatus.classList.add('task_status');
    tdStatus.textContent = state;
    const tdEdit = document.createElement('td');
    const buttonEditDel = document.createElement('button');
    buttonEditDel.classList.add('btn', 'btn-danger', 'me-3');
    buttonEditDel.textContent = 'Удалить';
    const buttonEditDone = document.createElement('button');
    buttonEditDone.classList.add('btn', 'btn-success');
    buttonEditDone.textContent = 'Завершить';
    tdEdit.append(buttonEditDel, buttonEditDone);
    trElement.append(tdNum, tdTask, tdStatus, tdEdit);
    if (tdStatus.textContent === 'выполнено') {
        trElement.classList.add('table-success');
    }
    return trElement;
};
const createModal = () => {
  const overlayModal = document.createElement('div');
  overlayModal.classList.add('overlay');
  overlayModal.innerHTML = `
  <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Приветствую Вас!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
      <div class="modal-body">
        <form class="form d-flex align-items-center mb-3" for="name">
        <label class="form-group me-3 mb-0">
        <span>Представьтесь пожалуйста</span>
        <input class="modal_input" name = "name" type = "text" required placeholder = "введите ваше имя">
        </label>
        <button type="submit" class="btn btn-primary modal_btn">Cохранить</button>
        </form>
        </div>

    </div>
  </div>
</div>
        `;
        return overlayModal;
}

const renderTask = (data, elem) => {
  elem.append(createRow(data));
};
const renderTasks = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
};
const user = prompt('Введите ваше имя');
const getTaskData = key => JSON.parse(localStorage.getItem(key)) || [];
const setTaskData = (key, obj) => {
  let newdata = getTaskData(key);
  if (newdata.length === 0) {
    newdata = data;
    localStorage.setItem(user, JSON.stringify(newdata));
  }
  newdata.push(obj);
  localStorage.setItem(user, JSON.stringify(newdata));
};
const removeTaskData = (task) => {
  const newdata = getTaskData(user);
  let dataindex;
  newdata.forEach((data, index) => {
    if (data.task === task) {
      dataindex = index;
    }
  });
  newdata.splice(dataindex, 1);
  localStorage.setItem(user, JSON.stringify(newdata));
};
const changeTaskData = (task) => {
    const newdata = getTaskData(user);
    newdata.forEach((data) => {
        if (data.task === task) {
            data['state'] = 'выполнено';
        }
    });
    localStorage.setItem(user, JSON.stringify(newdata));
}
const data = [];
  let newdata = getTaskData(user);
  if (newdata.length === 0) {
    newdata = data;
  }
  // const renderModal = () => {
  //   const modal = createModal();
  //   baseContainer.append(modal);
  //   return {
  //     modal,
  //   }
  // };
  //  renderModal();
const renderTodoApp = (app, title) => {
    const header = createHeader();
    const headerTitle = createTitle();
    const main = createMain();
    const table = createTable();
    const {form, overlay} = createForm();
    header.headerContainer.append(headerTitle);
    main.mainContainer.append(overlay, table);
    app.append(header, main);
    return {
      list: table.tbody,
      title,
      formOverlay: overlay, form,
    };
};
const {
    list,
    title,
    formOverlay,
    form,
} = renderTodoApp(baseContainer);
// const modalEl = document.querySelector('.modal');
// modalEl.style.display = 'block';
// const modalBtn = document.querySelector('.modal_btn');
// const modalInput = document.querySelector('.modal_input');
// const modalClose = document.querySelector('.btn-close');
// modalClose.addEventListener('click', () => {
//   modalEl.style.display = 'none';
// });
// modalBtn.addEventListener('click', () => {
//   user = modalInput.value;
//   modalEl.style.display = 'none';
// });
const formControl = (form, list) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    newTask['state'] = 'в процессе';
    renderTask(newTask, list);
    setTaskData(user, newTask);
    form.reset();
  });
};

formControl(form, list);

let allRow = renderTasks(list, newdata);
list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-danger')) {
    const ok = confirm('Вы действительно хотите удалить задачу?');
    if (ok) {
    target.closest('.task_row').remove();
    const task = (target.closest('.task_row').querySelector('.task').textContent);
    removeTaskData(task);
    }
    }
});
list.addEventListener('click', e => {
    const target = e.target;
if (target.closest('.btn-success')) {
    target.closest('.task_row').classList.add('table-success');
    const task = (target.closest('.task_row').querySelector('.task').textContent);
    target.closest('.task_row').querySelector('.task_status').textContent = 'выполнено';
    changeTaskData(task);
    }
});
