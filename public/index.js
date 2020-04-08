const requestMethod = (method, url, data) => fetch(url, {
  method,
  body: JSON.stringify(data),
  headers: data ? { 'content-type': 'application/json' } : {},
}).then((response) => {
  if (response.status >= 400) {
    return response.json().catch((errResData) => {
      const error = new Error('Something went wrong!');
      error.data = errResData;
      throw error;
    });
  }
  return response;
});

const getTasks = async () => {
  const data = await requestMethod('GET', '/tasks');
  console.log(data);
  const response = await data.json();
  console.log(response);
  const tasksArr = response.map((data) => data);
  const tbody = document.getElementById('tbody');

  tasksArr.forEach((task) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td id=${task.id}>${task.task_name} </td>
      <td>${task.task_description}</td>
      <td>${task.due_date}</td>
      <td>${task.is_complete}</td>
      <button id="updateButton" onClick="updateTask(${task.id})"class="button-primary">Update</button>
      <button onClick="deleteTask(${task.id})" class="button-primary">Delete</button>
      <button onClick="completeTask(${task.id})" class="button-primary">Complete</button>
    `;
    tbody.appendChild(tr);
  });
};

const completeTask = (id) => {
  const response = requestMethod('PUT', `/markComplete/${id}`);
  window.location.reload();
};

const deleteTask = async (id) => {
  const response = await requestMethod('DELETE', `/tasks/${id}`);
  window.location.reload();
};

const updateTask = (id) => {
  const button = document.getElementById('updateButton');
  const form = document.getElementById('form');
  button.addEventListener('click', () => {
    form.innerHTML = `
      <form action= "/tasks/${id}" method ="POST">
        <div class="row">
          <div class="six columns">
            <label for="updating task">Update Task</label>
            <input type="text" name="taskName" placeholder="new task" id="taskName"/>
            <input type="text" name="taskDescription" placeholder="description of task" id="taskDescription">
            <input type="datetime-local" name ="dueDate" id="dueDate"/>
          </div>
        </div>
        <input type="submit" name="submit" class="button-primary"/>
      </form>
  `;
  });

  form.addEventListener('submit', () => {
    fetch(`/tasks/${id}`, {
      method: 'POST',
      body: {
        taskName: form.taskName.value,
        taskDescription: form.taskDescription.value,
        dueDate: form.dueDate.value,
      },
    })
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  });
};

window.addEventListener('load', () => {
  getTasks();
});
