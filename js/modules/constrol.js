import serviceStorage from "./serviceStorage.js";
const {
  getTaskData,
  setTaskData,
  addTaskData,
  removeTaskData,
} = serviceStorage;

const formControl = (form, list) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    renderTask()
    setStorage('data', newContact);
    form.reset();
  });
};

export default {
    formControl,
}
