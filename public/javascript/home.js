const updateTask = async(taskId) => {
  const button = document.getElementById('updateButton');
  const updateForm = document.getElementById('updateForm');

  button.addEventListener('click', () => {
    updateForm.innerHTML = `
    <form id="nameForm" method="post" action="/updateTask/${taskId}">
      <label for="name">Name</label>
      <input id="newName" type="text" name="name"/>
      <label for="description">Description</label>
      <textarea id="newDesc" name="description"> </textarea>
      <label for="dueDate">Date</label>
      <input id="newDate" type="datetime-local" name="dueDate"/>
      <input id="submit" type="submit" value="Update!"/>
    </form>
    `;

    const form = document.getElementById('nameForm');

    form.addEventListener('submit', () => {
      fetch(`/updateTask/${taskId}`, {
          method: 'POST',
          body: {
            name: form.newName.value,
            description: form.newDesc.value,
            dueDate: form.newDate.value,
          },
        })
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    });
  });
};

const deleteTask = async(taskId) => {
  await fetch(`/deleteTask/${taskId}`, { method: 'DELETE' });
  window.location.reload();
};

const completeTask = async(taskId) => {
  await fetch(`/isComplete/${taskId}`, { method: 'PUT' });
  window.location.reload();
};

window.addEventListener('load', async() => {
  try {
    const response = await fetch('/tasks', { method: 'GET' });
    const data = await response.json();

    if (data.length === 0) {
      return data;
    }

    return data.forEach((task) => {
      document.getElementById('taskTable').innerHTML += `
    <tr>
        <td id="name" class="title">${task.name}</td>
        <td id="date" class="dueDate">${task.due_date}</td>
        <td id="desc" class="description">${task.description}</td>
        <td id="isComplete" class="completed">${task.completed}</td>
        <td class="buttons">
          <button id="updateButton" onclick="updateTask(${task.id})">Update</button>
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
  }
  catch (err) {
    console.log(err);
  }
});
