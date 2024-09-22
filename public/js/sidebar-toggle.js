const toggleButton = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
});



document.querySelector('.sidebar-toggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('collapsed');
    document.querySelector('.main-content').classList.toggle('expanded');
});



document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
});

// Sidebar toggle functionality (example script)
document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
});
