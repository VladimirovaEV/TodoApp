import {user} from './createElements.js';

export const data = [];
export const getTaskData = key => JSON.parse(localStorage.getItem(key)) || [];
export const setTaskData = (key, obj) => {
  let newdata = getTaskData(key);
  if (newdata.length === 0) {
    newdata = data;
    localStorage.setItem(user, JSON.stringify(newdata));
  }
  newdata.push(obj);
  localStorage.setItem(user, JSON.stringify(newdata));
};
export const removeTaskData = (task) => {
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
export const changeTaskData = (task) => {
  const newdata = getTaskData(user);
  newdata.forEach((data) => {
    if (data.task === task) {
      data['state'] = 'выполнено';
    }
  });
  localStorage.setItem(user, JSON.stringify(newdata));
};
export const changeBackTaskData = (task) => {
  const newdata = getTaskData(user);
  newdata.forEach((data) => {
    if (data.task === task) {
      data['state'] = 'в процессе';
    }
  });
  localStorage.setItem(user, JSON.stringify(newdata));
};
export const editTaskData = (task) => {
  const newdata = getTaskData(user);
  newdata.forEach((data) => {
    if (data.id === task.id) {
      data['task'] = task.textContent;
    }
  });
  localStorage.setItem(user, JSON.stringify(newdata));
};
