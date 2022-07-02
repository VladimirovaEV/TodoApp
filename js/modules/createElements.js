export const user = prompt('Введите ваше имя');
export const baseContainer = document.querySelector('div.app-container');
baseContainer.classList.add("vh-100", "w-100", "d-flex", "align-items-center", "justify-content-center", "flex-column");

export const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
};
export const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
};
export const createTitle = () => {
    const h3 = document.createElement('h3');
    h3.classList.add('title');
    h3.textContent = `Todo App`;
    return h3;
};
export const createUser = () => {
    const h3 = document.createElement('h3');
    h3.classList.add('user');
    h3.textContent = `Привет, ${user}`;
    return h3;
};
export const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
};
export const createButtonsGroup = params => {
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
export const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    const form = document.createElement('form');
    form.classList.add('form', 'd-flex', 'align-items-center', 'mb-3');
    const label = document.createElement('label');
    label.classList.add('form-group', 'me-3', 'mb-0');
    label.htmlFor = 'task';
    const input = document.createElement('input');
    input.setAttribute('placeholder', 'ввести задачу');
    input.setAttribute('id', 'task');
    input.setAttribute('required', '');
    input.type = 'text';
    input.name = 'task';
    input.classList.add('form-control');
    const dropdownDiv = document.createElement('div');
  dropdownDiv.innerHTML = `<select class="dropdown me-3">
  <option value="Обычная задача" class="dropdown-item">Обычная задача</option>
  <option value="Важная задача" class="dropdown-item">Важная задача</option>
  <option value="Срочная задача" class="dropdown-item">Срочная задача</option>
</select>`;
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
    form.append(label, dropdownDiv, ...buttonGroup.btns);
    overlay.append(form);
    return {
      overlay,
      form,
    };
}
export const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered', 'table-sm');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Важность</th>
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
export const createRow = function({task: task, state: state, id: id, important: important}) {
    const trElement = document.createElement('tr');
    const tr = document.querySelectorAll('.task_row');
    const trCount = tr.length + 1;
    trElement.classList.add('task_row', 'table-light');
    const tdNum = document.createElement('td');
    tdNum.classList.add('task_number');
    tdNum.textContent = trCount;
    const tdTask = document.createElement('td');
    tdTask.classList.add('task');
    tdTask.textContent = task;
    tdTask.setAttribute('id', id);
    const tdImportant = document.createElement('td');
    tdImportant.textContent = important;
    tdImportant.classList.add('task_importance');
    if (important === 'Важная задача') {
      trElement.classList.remove('table-light');
      trElement.classList.add('table-warning');
    }
    if (important === 'Срочная задача') {
      trElement.classList.remove('table-light');
      trElement.classList.add('table-danger');
    }
    const tdStatus = document.createElement('td');
    tdStatus.classList.add('task_status');
    tdStatus.textContent = state;
    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn', 'btn-secondary', 'me-3');
    buttonEdit.textContent = 'Редактировать';
    const buttonEditDel = document.createElement('button');
    buttonEditDel.classList.add('btn', 'btn-danger', 'me-3');
    buttonEditDel.textContent = 'Удалить';
    const buttonEditDone = document.createElement('button');
    buttonEditDone.classList.add('btn', 'btn-success');
    buttonEditDone.textContent = 'Завершить';
    tdEdit.append(buttonEdit, buttonEditDel, buttonEditDone);
    trElement.append(tdNum, tdTask, tdImportant,tdStatus, tdEdit);
    if (tdStatus.textContent === 'выполнено') {
        trElement.classList.add('table-success');
    }
    return trElement;
};
