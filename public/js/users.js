document.addEventListener('DOMContentLoaded', () => {
    const addUserBtn = document.getElementById('add-user-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const addUserForm = document.getElementById('add-user-form');
    const userForm = document.getElementById('user-form');
    const messageContainer = document.getElementById('message-container');

    // Toggle Add User Form
    addUserBtn.addEventListener('click', () => {
        addUserForm.classList.toggle('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        addUserForm.classList.add('hidden');
    });

    // Handle Form Submission
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

            // Show success or error message only
            if (response.status === 201) {
                showMessage(result.success, 'success');
                // Optionally, you can reset the form and hide the add user form
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
