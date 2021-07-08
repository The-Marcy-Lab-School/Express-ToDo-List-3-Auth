const addTaskForm = document.getElementById('addTaskForm');

// creating a task
taskInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskTitle = addTaskForm.title.value;
  const taskDescription = addTaskForm.description.value;
  const dueDate = addTaskForm.dueDate.value;

  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      taskTitle,
      taskDescription,
      dueDate
    }),
  }).then((res) => {
    if (res.status === 200) {
      window.location.reload();
    }
  });
});


const deleteTask = async(taskId) => {
  await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
  window.location.reload();
};

const completeTask = async(taskId) => {
  await fetch(`/tasks/${taskId}`, { method: 'PUT' });
  window.location.reload();
};

window.onload = async () => {
  const response = await fetch('/tasks', { method: 'GET' });
  const data = await response.json();
  const taskTable = document.getElementById('taskTableBody');

  return data.forEach((task) => {
    taskTable.innerHTML += `
      <tr>
          <td id="name" class="title">${task.task_name}</td>
          <td id="date" class="dueDate">${task.due_date}</td>
          <td id="taskDescription" class="description">${task.task_description}</td>
          <td id="isComplete" class="completed">${task.is_complete}</td>

          <td class="buttons">
            <button onclick="updateTask(${task.id})">Update</button>
          </td>

          <td class="buttons">
            <button onclick="deleteTask(${task.id})">Delete</button>
          </td>
          <td class="buttons">
            <button onclick="completeTask(${task.id})">Complete</button>
          </td>
        </tr>
      `;
  });
};
