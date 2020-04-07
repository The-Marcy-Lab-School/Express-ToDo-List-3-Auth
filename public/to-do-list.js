const incomplete = document.getElementById('incomplete-tasks')

fetch('https://5a90f1b3156e47f4b0e59404a9162ead.vfs.cloud9.us-east-2.amazonaws.com/').then((res) => res.json()).then((json) => incomplete.innerText = json)