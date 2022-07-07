import {
  createHeader,
  createTitle,
  createUser,
  createMain,
  createTable,
  createForm,
  createRow,
} from './createElements.js';

const renderTask = (data, elem) => {
  elem.append(createRow(data));
  const tr = document.querySelectorAll('.task_row');
  tr.forEach((item, i) => {
    item.querySelector('.task_number').textContent = i + 1;
  });
};
const renderTasks = (elem, data) => {
  const allRow = data.map(createRow);
  allRow.forEach((item, i) => {
    item.querySelector('.task_number').textContent = i + 1;
    if (item.querySelector('.task_status').textContent === 'выполнено') {
      item.classList.remove('table-light');
      item.classList.remove('table-warning');
      item.classList.remove('table-danger');
      item.classList.add('table-success');
    };
  });
  elem.append(...allRow);
  return allRow;
};
const renderTodoApp = (app, title) => {
  const header = createHeader();
  const headerUser = createUser();
  const headerTitle = createTitle();
  const main = createMain();
  const table = createTable();
  const {form, overlay} = createForm();
  header.headerContainer.append(headerUser, headerTitle);
  main.mainContainer.append(overlay, table);
  app.append(header, main);
  return {
    list: table.tbody,
    title,
    formOverlay: overlay, form,
  };
};

export default {
  renderTask,
  renderTasks,
  renderTodoApp,
};