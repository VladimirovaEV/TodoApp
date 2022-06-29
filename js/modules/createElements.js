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
    const input = document.createElement('input');
    input.setAttribute('placeholder','ввести задачу');
    input.type = "text";
    // input.disabled = true;
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
const createRow = (task) => {
    const trElement = document.createElement('tr');
    const tr = document.getElementsByTagName('tr');
	let trCount = tr.length;
    trElement.classList.add('task_row');
    const tdNum = document.createElement('td');
    tdNum.classList.add('task_number');
    tdNum.textContent = trCount;
    const tdTask = document.createElement('td');
    tdTask.classList.add('task');
    tdTask.textContent = task;

    const tdStatus = document.createElement('td');
    tdStatus.classList.add('task_status');
    tdStatus.textContent = 'В процессе';

    const tdEdit = document.createElement('td');
    const buttonEditDel = document.createElement('button');
    buttonEditDel.classList.add('btn', 'btn-danger', 'me-3');
    buttonEditDel.textContent = 'Удалить';
    const buttonEditDone = document.createElement('button');
    buttonEditDone.classList.add('btn', 'btn-success');
    buttonEditDone.textContent = 'Завершить';
    tdEdit.append(buttonEditDel, buttonEditDone);
    trElement.append(tdNum, tdTask, tdStatus, tdEdit);
    return trElement;
};

export default {
    baseContainer,
    createContainer,
    createHeader,
    createTitle,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createRow
}