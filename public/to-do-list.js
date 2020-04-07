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
                        <button class="button button-outline complete-button">Complete</button>
                        <button class="button delete-button">Delete</button>
                        <a class="button button-clear update-button" href="/update-task/${task.task_id}">Update</a>
            `
                incomplete.appendChild(taskElement)
                
                const completeButton = document.getElementsByClassName('complete-button')
                const deleteButton = document.getElementsByClassName('delete-button')
                const updateButton = document.getElementsByClassName('update-button')
                
                deleteButton.addEventListener('click', (event) => {
                    fetch(`/delete-task/${task.task_id}`,{method:'post'})
                })
                completeButton.addEventListener('click', (event) => {
                    fetch(`/complete-task/${task.task_id}`,{method:'post'})
                })
            }
            
            if(task.is_complete === true){
                let taskElement = document.createElement('div')
                taskElement.classList.add("task")
                taskElement.innerHTML = `
                        <h3 class="name">${task.name}</h3>
                        <p class="description">${task.description}</p>
                        <p class="dateAdded">Added: ${task.date_added}</p>
                        <p class="dateCompleted">${task.date_complete}</p>
                        <button class="button delete-button">Delete</button>
            `
                complete.appendChild(taskElement)
            
                const deleteButton = document.getElementsByClassName('delete-button')
                
                deleteButton.addEventListener('click', (event) => {
                    fetch(`/delete-task/${task.task_id}`,{method:'post'})
                })
            }
        }
    })
})



