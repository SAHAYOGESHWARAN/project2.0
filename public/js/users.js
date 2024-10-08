document.addEventListener('DOMContentLoaded', () => {
    const addUserBtn = document.getElementById('add-user-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const addUserForm = document.getElementById('add-user-form');
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const messageContainer = document.getElementById('message-container');

    // Toggle Add User Form
    addUserBtn.addEventListener('click', () => {
        addUserForm.classList.toggle('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        addUserForm.classList.add('hidden');
    });

    // Fetch and display users on page load
    const loadUsers = async () => {
        try {
            const response = await fetch('/users');  // Fetch users from backend
            const users = await response.json();

            // Clear the user list before adding
            userList.innerHTML = '';

            users.forEach(user => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${user._id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phonenumber}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;
                userList.appendChild(newRow);
            });
        } catch (err) {
            showMessage('Failed to load users', 'error');
        }
    };

    // Call loadUsers on page load
    loadUsers();

    // Handle Form Submission to add new user
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(userForm);
        const data = Object.fromEntries(formData);

        try {
            // Send POST request to server to add user
            const response = await fetch('/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            // Show success or error message
            if (response.status === 201) {
                showMessage(result.success, 'success');

                // Reload users
                loadUsers();

                // Clear form
                userForm.reset();
                addUserForm.classList.add('hidden');
            } else {
                showMessage(result.error || 'Failed to add user', 'error');
            }
        } catch (err) {
            showMessage('Server error. Try again later.', 'error');
        }
    });

    // Function to show success/error messages
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('alert', `alert-${type}`);
        messageDiv.innerText = message;
        messageContainer.appendChild(messageDiv);

        // Automatically remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});
