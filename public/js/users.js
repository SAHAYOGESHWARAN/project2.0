
function renderUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear existing users

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="view-btn" data-id="${user.id}">View</button>
                <button class="edit-btn" data-id="${user.id}">Edit</button>
                <button class="delete-btn" data-id="${user.id}">Delete</button>
            </td>
        `;
        userList.appendChild(row);
    });
}

// Initialize user list
renderUsers();

// Add event listeners for pagination buttons (mock functionality)
document.querySelector('.prev-btn').addEventListener('click', () => {
    console.log('Previous page');
    // Implement pagination logic
});

document.querySelector('.next-btn').addEventListener('click', () => {
    console.log('Next page');
    // Implement pagination logic
});
