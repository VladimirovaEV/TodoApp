import {
    user,
    baseContainer,
} from './createElements.js';
import {getTaskData,
  removeTaskData,
  changeTaskData,
  editTaskData,} from './serviceStorage.js';
import {formControl} from './control.js';
import render from './render.js';
const {
    renderTasks,
    renderTodoApp,
} = render;

const init = () => {
const data = [];
  let newdata = getTaskData(user);
  if (newdata.length === 0) {
    newdata = data;
  }
  
const {
    list,
    title,
    formOverlay,
    form,
} = renderTodoApp(baseContainer);

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
    const tr = document.querySelectorAll('.task_row');
    tr.forEach((item, i) => {
      item.querySelector('.task_number').textContent = i + 1;
    })
    }
    }
});
list.addEventListener('click', e => {
    const target = e.target;
if (target.closest('.btn-success')) {
  target.closest('.task_row').classList.remove('table-light');
  target.closest('.task_row').classList.remove('table-warning');
  target.closest('.task_row').classList.remove('table-danger');
    target.closest('.task_row').classList.add('table-success');
    const task = (target.closest('.task_row').querySelector('.task').textContent);
    target.closest('.task_row').querySelector('.task_status').textContent = 'выполнено';
    changeTaskData(task);
    }
});
list.addEventListener('click', e => {
  const target = e.target;
  if (target.closest('.btn-secondary')) {
      const task = (target.closest('.task_row').querySelector('.task'));
      task.contentEditable = true;
      task.addEventListener('blur', () => {
        editTaskData(task);
    })
  };
})
    
};

export default init;
