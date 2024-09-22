document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const taskDescription = document.getElementById('task').value;

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: taskDescription }),
    })
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('task-list');
        const newTask = `
            <div class="task">
                <p>${data.description}</p>
                <small>Created on ${new Date(data.date).toLocaleString()}</small>
            </div>
        `;
        taskList.innerHTML += newTask;
        document.getElementById('task').value = '';
    })
    .catch(error => console.error('Error:', error));
});

// Load existing tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            if (data.tasks && data.tasks.length > 0) {
                taskList.innerHTML = data.tasks.map(task => `
                    <div class="task">
                        <p>${task.description}</p>
                        <small>Created on ${new Date(task.date).toLocaleString()}</small>
                    </div>
                `).join('');
            } else {
                taskList.innerHTML = '<p>No tasks available.</p>';
            }
        })
        .catch(error => console.error('Error fetching tasks:', error));
});
