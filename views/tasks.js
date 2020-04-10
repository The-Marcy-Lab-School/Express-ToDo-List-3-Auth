const deleteTask = async(taskId) => {
  await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
  window.location.reload();
};

const updateTask = async(taskId) => {
  let status = document.getElementById(taskId).textContent;
  const isCompleted = true;
  const notCompleted = false;
  if (status == 'false'){
    console.log('is not completed');
    await fetch(`/tasks/${taskId}/${isCompleted}`, { method: 'PUT' });
    status = 'true';
  }else{
    console.log('iscompleted');
    await fetch(`/tasks/${taskId}/${notCompleted}`, { method: 'PUT' });
    status = 'false';
  }
  window.location.reload();
};

const addTasks = async () => {
  const arrTasks = await fetch('/userTasks');
  const tasks = await arrTasks.json(); 
  
  const taskTable = document.getElementById('allTasks');
  
  console.log('it goes in function');
 
  tasks.forEach((task) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.date_due}></td>
        <td>${task.description}</td>
        <td><button class="button button-outline" onclick="updateTask(${task.id})" id=${task.id}>${task.completed}</button></td>
        <td><button onclick="deleteTask(${task.id})"> Delete </button></td> `;
    taskTable.appendChild(row);
  });
};

addTasks();
