document.addEventListener('DOMContentLoaded', () => {
    fetch('/tasks')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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
        .catch(err => {
            console.error('Error fetching tasks:', err);
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '<p>Error loading tasks. Please try again later.</p>';
        });
});
