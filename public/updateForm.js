const requestMethod = (method, url, data) => fetch(url, {
  method,
  body: JSON.stringify(data),
  headers: data ?  {'content-type': 'application/json'}:{},
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

const form = document.getElementById('updateTask');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const taskName = form.taskName;
  const taskDescription = form.taskDescription;
  const dueDate = form.dueDate;
  const data = requestMethod('POST',`/tasks/updateTask(id)`, {taskName,taskDescription,dueDate});
  window.location = '/showTask';
});

const updateTask = async (id)=>{
  const response = await requestMethod('PUT' `/tasks/${id}`)
  const data = await response.json()
  console.log(data)
}

