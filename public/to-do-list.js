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
                        <button class="button button-outline">Complete</button>
                        <button class="button">Delete</button>
                        <button class="button button-clear">Update</button>
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
                        <p class="dateCompleted">${task.date_complete}</p>
                        <button class="button button-outline">Complete</button>
                        <button class="button">Delete</button>
                        <button class="button button-clear">Update</button>
            `
                complete.appendChild(taskElement)
            }
            
        }
    })
})

