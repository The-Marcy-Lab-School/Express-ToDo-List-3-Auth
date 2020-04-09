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
