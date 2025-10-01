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
});document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA PARA ACTIVAR PESTAÑA DESDE LA URL ---
    function activateTabFromHash() {
        const hash = window.location.hash; // Obtiene el # de la URL, ej: "#history"
        
        if (hash) {
            const targetLink = document.querySelector(`.tab-list a[href="${hash}"]`);
            const targetPanel = document.querySelector(hash);

            if (targetLink && targetPanel) {
                document.querySelectorAll('.tab-list li.active').forEach(item => item.classList.remove('active'));
                document.querySelectorAll('.tab-panel.active').forEach(item => item.classList.remove('active'));
                
                targetLink.parentElement.classList.add('active');
                targetPanel.classList.add('active');
            }
        }
    }

    // --- LÓGICA PARA CLIC EN PESTAÑAS ---
    const tabLinks = document.querySelectorAll('.tab-list a');
    tabLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetPanelId = link.getAttribute('href');
            
            document.querySelectorAll('.tab-list li.active').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.tab-panel.active').forEach(item => item.classList.remove('active'));
            
            link.parentElement.classList.add('active');
            document.querySelector(targetPanelId).classList.add('active');
        });
    });

    // --- LÓGICA PARA MENÚ DESPLEGABLE ---
    const menuContainer = document.getElementById('dropdown-menu');
    const menuButton = document.querySelector('.bttn-all-menu');

    function toggleMenu() {
        menuContainer.classList.toggle('visible');
    }
    
    if (menuButton) {
        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    document.addEventListener('click', (e) => {
        if (menuContainer.classList.contains('visible') && !e.target.closest('#header')) {
            toggleMenu();
        }
    });

    // --- LLAMAR A LA FUNCIÓN AL CARGAR LA PÁGINA ---
    activateTabFromHash();
});
document.addEventListener('DOMContentLoaded', function() {

    // --- SECCIÓN 1: LÓGICA DEL MENÚ DESPLEGABLE ---
    const menuContainer = document.getElementById('dropdown-menu');
    const menuButton = document.querySelector('.bttn-all-menu');

    // Función para abrir/cerrar el menú
    function toggleMenu() {
        if (menuContainer) {
            menuContainer.classList.toggle('visible');
        }
    }

    // Asignar el evento de clic SOLAMENTE al botón "MENU"
    if (menuButton) {
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Cerrar el menú si se hace clic fuera del header
    document.addEventListener('click', function(e) {
        if (menuContainer && menuContainer.classList.contains('visible') && !e.target.closest('#header')) {
            toggleMenu();
        }
    });


    // --- SECCIÓN 2: LÓGICA DE LAS PESTAÑAS ---
    const tabSection = document.querySelector('.page-tab-section');
    const tabLinks = document.querySelectorAll('.tab-list a');

    // Función para cambiar de pestaña
    function switchTab(link) {
        const targetPanelId = link.getAttribute('href');
        const targetPanel = document.querySelector(targetPanelId);

        if (targetPanel) {
            document.querySelectorAll('.tab-list li.active').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.tab-panel.active').forEach(item => item.classList.remove('active'));
            
            link.parentElement.classList.add('active');
            targetPanel.classList.add('active');

            if (tabSection) {
                tabSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // Asignar el evento de clic a cada enlace de pestaña
    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            switchTab(this);
        });
    });


    // --- SECCIÓN 3: ACTIVAR PESTAÑA DESDE UN ENLACE EXTERNO ---
    function activateTabFromHash() {
        const hash = window.location.hash;
        
        if (hash) {
            const targetLink = document.querySelector(`.tab-list a[href="${hash}"]`);
            if (targetLink) {
                setTimeout(() => {
                    switchTab(targetLink);
                }, 100);
            }
        }
    }

    // Ejecutar la función al cargar la página
    activateTabFromHash();

});