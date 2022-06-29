import createElements from "./createElements.js";
const {
    baseContainer,
    createContainer,
    createHeader,
    createTitle,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createRow
} = createElements;
import serviceStorage from "./serviceStorage.js";
const {
  getTaskData,
  setTaskData,
  addTaskData,
  removeTaskData,
} = serviceStorage;
const renderTask = function(elem, data) {
    const newRow = createRow(data);
    elem.append(newRow);
    return newRow;
};

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
}

export default {
    renderTask,
    renderTodoApp,
}