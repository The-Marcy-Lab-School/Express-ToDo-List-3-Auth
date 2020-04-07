window.addEventListener('load', async(e) => {
  const response = await fetch('/tasks');
  console.log(response);
  const data = await response.json();
  console.log(`Data: ${data}`);

  return data.map((task) => {
    return document.getElementById('taskTable').innerHTML =
      `
    <tr>
        <td class="title">${task.name}</td>
        <td class="dueDate">${task.dueDate}</td>
        <td class="description">${task.description}</td>
        <td class="completed">${task.completed}</td>
        <td class="buttons">
          <button onclick="deleteTask(${task.id})"></button>
        </td>
        <td class="buttons">
          <button onclick="completeTask(${task.id})></button>"
        </td>
        <td class="buttons">
          <button onclick="updateTask(${task.id})"></button>
        </td>
      </tr>
    `;
  });
});

const deleteTask = async(taskId) => {
  const response = await fetch(`/deleteTask/${taskId}`)
}
