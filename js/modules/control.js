import {setTaskData} from './serviceStorage.js';
import {user} from './createElements.js';
import render from "./render.js";
const {
      renderTask,
} = render;

export const formControl = (form, list) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    newTask['state'] = 'в процессе';
    newTask['id'] = Math.random().toString().substring(2, 10);
    const dropDown = document.querySelector('.dropdown');
    newTask['important'] = dropDown.value;
    renderTask(newTask, list);
    setTaskData(user, newTask);
    form.reset();
  });
};

