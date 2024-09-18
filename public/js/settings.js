document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    fetch('/settings/update', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.querySelector('.alert-success').textContent = data.message;
        } else {
            document.querySelector('.alert-danger').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.querySelector('.alert-danger').textContent = 'An error occurred. Please try again.';
    });
});
