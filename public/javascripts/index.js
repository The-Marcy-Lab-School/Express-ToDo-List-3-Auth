/* New Task Form */
const taskInputForm = document.getElementById('taskInput');

taskInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInputForm.task.value;
  const taskDetails = taskInputForm.description.value;
  const dueDate = taskInputForm.dueDate.value;
  const reqBody = { task, description: taskDetails, dueDate };
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  }).then((res) => {
    if (res.status === 200) {
      window.location.reload();
    }
  });
});

/* Populate todo list */
const getTasks = () => fetch('/tasks')
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    window.location.replace('/login');
  })
  .then((json) => json)
  .catch(() => {
    window.location.replace('/login');
  });

const paintTasks = async () => {
  const todosBody = document.getElementById('todosBody');
  let tasks = await getTasks();
  tasks = tasks.map((task) => ({
    task: task.task_name,
    details: task.task_description,
    dueDate: task.due_date,
    status: task.is_complete,
    id: task.task_id,
  }));

  tasks.forEach((task) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td id="${task.id}">${task.task}</td>
    <td>${task.details}</td>
    <td>${task.dueDate}</td>
    <td>${task.status}</td>
    <td>
    <button type="button" class="taskAction" onclick="toggleComplete(${task.id})">Change Status</button>
    <button type="button" class="taskAction" onclick="deleteTask(${task.id})">Delete Task</button>
    </td>
    `;
    todosBody.appendChild(row);
  });
};

paintTasks();

const toggleComplete = (taskId) => {
  fetch(`/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTask = (taskId) => {
  fetch(`/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
      } else {
        console.log(res);
      }
    })
    .catch();
};
