document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (sidebar && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('w-64');
            sidebar.classList.toggle('w-20');
            
            // Toggle text visibility
            const texts = sidebar.querySelectorAll('.sidebar-text');
            texts.forEach(text => text.classList.toggle('hidden'));
            
            // Adjust main content margin
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                if (sidebar.classList.contains('w-20')) {
                    mainContent.style.marginLeft = '5rem'; // 80px
                } else {
                    mainContent.style.marginLeft = '16rem'; // 256px
                }
            }
        });
    }

    // 2. Mobile Sidebar Toggle
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    // 3. Display Logged-In User Details
    const userEmailElement = document.getElementById('user-email');
    const userRoleElement = document.getElementById('user-role');
    const loggedInUser = sessionStorage.getItem('loggedInUser') || 'user@stacklyerp.com';
    const userRole = sessionStorage.getItem('userRole') || 'User';

    if (userEmailElement) {
        userEmailElement.textContent = loggedInUser;
    }
    if (userRoleElement) {
        userRoleElement.textContent = userRole;
    }

    // 4. Dynamic Content Switching
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentSections = document.querySelectorAll('.dashboard-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (!targetId) return; // Not a dynamic link
            
            e.preventDefault();

            // Active State on Sidebar
            sidebarLinks.forEach(l => {
                l.classList.remove('bg-blue-600', 'text-white');
                l.classList.add('text-slate-400', 'hover:bg-slate-800', 'hover:text-white');
            });
            link.classList.remove('text-slate-400', 'hover:bg-slate-800', 'hover:text-white');
            link.classList.add('bg-blue-600', 'text-white');

            // Show Target Section
            contentSections.forEach(section => {
                section.classList.add('hidden');
            });
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
            
            // On mobile, close sidebar after click
            if (window.innerWidth < 1024 && !sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.add('-translate-x-full');
            }
        });
    });

    // 5. Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('loggedInUser');
            sessionStorage.removeItem('userRole');
            showToast('Logging out...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }
});
