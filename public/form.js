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

const form = document.getElementById('addTask');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = form.taskName.value;
  const taskDescription = form.taskDescription.value;
  const dueDate = form.dueDate.value;

  const data = requestMethod('POST', '/tasks', { taskName, taskDescription, dueDate });
  window.location.href = '/showTask';
});
