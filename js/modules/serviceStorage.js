const getTaskData = (key) => (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []);
const setTaskData = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
};
const addTaskData = task => {
    const data = getTaskData('user', task);
    data.push(task);
    setTaskData(data);
};
const removeTaskData = (task) => {
    const data = getTaskData('user');
    const newData = data.filter(item => item.task !== task);
    setTaskData(newData);
};

export default {
  getTaskData,
  setTaskData,
  addTaskData,
  removeTaskData,
};
