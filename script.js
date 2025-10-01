document.addEventListener('DOMContentLoaded', function() {

    // --- SECCIÓN 1: LÓGICA DE MENÚS (UNIFICADA Y CORREGIDA) ---
    const header = document.getElementById('header');
    const menuContainer = document.getElementById('dropdown-menu');
    const menuButton = document.querySelector('.bttn-all-menu');
    const desktopMenuTriggers = document.querySelectorAll('.gnb-menu-list > li > a');

    // Función para MOSTRAR el menú desplegable
    function showDropdown() {
        if (menuContainer && !menuContainer.classList.contains('visible')) {
            menuContainer.classList.add('visible');
        }
    }

    // Función para OCULTAR el menú desplegable
    function hideDropdown() {
        if (menuContainer && menuContainer.classList.contains('visible')) {
            menuContainer.classList.remove('visible');
        }
    }
    
    // -- Lógica para el botón "MENU" (funciona con clic en TODAS las pantallas) --
    if (menuButton) {
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Simplemente alterna la visibilidad del menú
            menuContainer.classList.contains('visible') ? hideDropdown() : showDropdown();
        });
    }

    // -- Lógica de HOVER (solo para computadora) --
    desktopMenuTriggers.forEach(trigger => {
        // Excluye 'HOME' de abrir el menú con hover
        if (trigger.textContent.trim().toUpperCase() === 'HOME') {
            return;
        }
        trigger.addEventListener('mouseover', function() {
            if (window.innerWidth > 992) { // Revisa que sea una pantalla de computadora
                showDropdown();
            }
        });
    });

    // Cierra el menú cuando el ratón sale del header (solo en computadora)
    if (header) {
        header.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                hideDropdown();
            }
        });
    }

    // Cierra con clic fuera (importante para que el botón de cierre "X" en móvil funcione)
    document.addEventListener('click', function(e) {
        if (menuContainer && menuContainer.classList.contains('visible') && !header.contains(e.target)) {
            hideDropdown();
        }
    });


    // --- SECCIÓN 2: LÓGICA DE LAS PESTAÑAS (sin cambios) ---
    const tabSection = document.querySelector('.page-tab-section');
    const tabLinks = document.querySelectorAll('.tab-list a');

    function switchTab(link) {
        const targetPanelId = link.getAttribute('href');
        const targetPanel = document.querySelector(targetPanelId);

        if (targetPanel && link) {
            document.querySelectorAll('.tab-list li.active').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.tab-panel.active').forEach(item => item.classList.remove('active'));
            
            link.parentElement.classList.add('active');
            targetPanel.classList.add('active');

            if (tabSection) {
                tabSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            switchTab(this);
        });
    });

    // --- SECCIÓN 3: ACTIVAR PESTAÑA DESDE URL (sin cambios) ---
    function activateTabFromHash() {
        const hash = window.location.hash;
        if (hash) {
            const targetLink = document.querySelector(`.tab-list a[href="${hash}"]`);
            if (targetLink) {
                setTimeout(() => { switchTab(targetLink); }, 100);
            }
        }
    }
    activateTabFromHash();
});