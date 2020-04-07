const incomplete = document.getElementById('incomplete')
const complete = document.getElementById('complete')

window.addEventListener('load', (event) => {
    fetch('/tasks')
    .then(res => res.json())
    .then(tasks => {
        const tasksArray = tasks.results
        for(let task of tasksArray){
            if(task.is_complete === false){
                let taskElement = document.createElement('div')
                taskElement.classList.add("task")
                taskElement.innerHTML = `
                        <h3 class="name">${task.name}</h3>
                        <p class="description">${task.description}</p>
                        <p class="dateAdded">Added: ${task.date_added}</p>
                        <button onclick="completeTask(${task.task_id})" class="button button-outline complete-button">Complete</button>
                        <button onclick="deleteTask(${task.task_id})" class="button delete-button">Delete</button>
                        <button onclick="updateTask(${task.task_id})" class="button button-clear update-button>Update</button>
            `
                incomplete.appendChild(taskElement)
            }
            
            if(task.is_complete === true){
                let taskElement = document.createElement('div')
                taskElement.classList.add("task")
                taskElement.innerHTML = `
                        <h3 class="name">${task.name}</h3>
                        <p class="description">${task.description}</p>
                        <p class="dateAdded">Added: ${task.date_added}</p>
                        <p class="dateCompleted">Completed: ${task.date_complete}</p>
                        <button onclick="deleteTask(${task.task_id})" class="button delete-button">Delete</button>
            `
                complete.appendChild(taskElement)
            }
        }
    })
})

const deleteTask = (taskId) => {
    fetch(`/delete-task/${taskId}`, {method:'delete'})
    location = '/to-do-list'
    location.reload()
} 

const completeTask = (taskId) => {
    fetch(`/complete-task/${taskId}`, {method:'put'})
    location = '/to-do-list'
    location.reload()
}

const updateTask = (taskId) => {
    location = '/update-task-page'
    location.reload()
    document.getElementsById("updateForm").setAttribute("action", `/update-task/${taskId}`)
}




