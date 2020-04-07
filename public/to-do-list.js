const incomplete = document.getElementById('incomplete')
const complete = document.getElementById('complete')

window.addEventListener('load', (event) => {
    fetch('/tasks').then(res => console.log(res.json()))
})