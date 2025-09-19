document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOGIC FOR PAGE TABS ---
    const tabLinks = document.querySelectorAll('.tab-list a');
    const tabPanels = document.querySelectorAll('.contents .tab-panel');

    tabLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            tabLinks.forEach(item => item.parentElement.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            link.parentElement.classList.add('active');
            const targetPanel = document.querySelector(link.getAttribute('href'));
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // --- 2. LOGIC FOR DROPDOWN MENU ---
    const menuContainer = document.getElementById('dropdown-menu');
    // Combine all triggers into one NodeList
    const menuTriggers = document.querySelectorAll('.gnb-menu-list a, .bttn-all-menu');

    // Function to toggle the menu's visibility
    function toggleMenu() {
        menuContainer.classList.toggle('visible');
    }
    
    // Add click listener to all triggers
    menuTriggers.forEach(trigger => {
        // Exclude 'HOME' link from opening the menu
        if (trigger.textContent.trim().toUpperCase() === 'HOME') {
            return;
        }
        
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevents the document click listener from firing immediately
            toggleMenu();
        });
    });

    // Close the dropdown if clicking outside of the header area
    document.addEventListener('click', (e) => {
        if (menuContainer.classList.contains('visible') && !e.target.closest('#header')) {
            toggleMenu();
        }
    });
});