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
import render from "./render.js";
const {
    renderTodoApp,
    renderTask,
} = render;
import serviceStorage from "./serviceStorage.js";
const {
  rgetTaskData,
  setTaskData,
  addTaskData,
  removeTaskData,
} = serviceStorage;
// import control from "./control.js";
// const {
//     formControl
// } = control;
const init = () => {
    renderTodoApp(baseContainer);
    // formControl(form, list);
    
};

export default init;