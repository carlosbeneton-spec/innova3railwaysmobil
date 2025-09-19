document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOGIC FOR PAGE TABS ---
    const tabLinks = document.querySelectorAll('.tab-list a');
    const tabPanels = document.querySelectorAll('.contents .tab-panel');

    tabLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            
            // Remove active class from all tab links and panels
            tabLinks.forEach(item => item.parentElement.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to the clicked tab link and corresponding panel
            link.parentElement.classList.add('active');
            const targetPanel = document.querySelector(link.getAttribute('href'));
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // --- 2. LOGIC FOR DROPDOWN MENU ---
    const menuContainer = document.getElementById('dropdown-menu');
    const menuButton = document.querySelector('.bttn-all-menu');
    const desktopMenuTriggers = document.querySelectorAll('.gnb-menu-list a');

    // Function to toggle the menu's visibility
    function toggleMenu() {
        menuContainer.classList.toggle('visible');
    }

    // Toggle menu with the "MENU" button
    menuButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Open menu on hover for desktop view
    desktopMenuTriggers.forEach(trigger => {
        // Exclude 'HOME' link from opening the menu
        if (trigger.textContent.trim().toUpperCase() === 'HOME') {
            return;
        }
        
        trigger.addEventListener('mouseover', () => {
            if (window.innerWidth > 768) { // Only on desktop
                menuContainer.classList.add('visible');
            }
        });
    });

    // Close the dropdown if clicking outside of the header area
    document.addEventListener('click', (e) => {
        const header = document.getElementById('header');
        if (menuContainer.classList.contains('visible') && !header.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close the dropdown when the mouse leaves the header area
    const header = document.getElementById('header');
    header.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) { // Only on desktop
            menuContainer.classList.remove('visible');
        }
    });
});