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

    // --- CÓDIGO CORREGIDO ---
    // Cierra el menú si se hace clic en el fondo/overlay (así funciona la "X" en móvil)
    if (menuContainer) {
        menuContainer.addEventListener('click', function(e) {
            // Si el clic es directamente en el contenedor del menú (el overlay)
            // y no en un elemento hijo como un enlace, se cierra.
            // Esto funciona para el pseudo-elemento 'X' porque el target es el contenedor.
            if (e.target === menuContainer) {
                hideDropdown();
            }
        });
    }


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
// Lógica universal para el botón de cambio de idioma en cualquier página
    const langButton = document.querySelector('.bttn-lang-sel');
    
    if (langButton) {
        langButton.addEventListener('click', function() {
            // 1. Obtiene el nombre del archivo actual (ej: 'index.html', 'about-us-es.html')
            const currentPath = window.location.pathname;
            // Maneja el caso en que la URL termine en "/" (asumiendo que es index.html)
            let currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html'; 
            let newFile = '';

            // Si la página actual *SÍ* tiene el sufijo -es (es ESPAÑOL)
            if (currentFile.endsWith('-es.html')) {
                // Redirige a la versión en INGLÉS (ej: about-us-es.html -> about-us.html)
                newFile = currentFile.replace('-es.html', '.html');
            } 
            // Si la página actual *NO* tiene el sufijo -es (es INGLÉS/Default)
            else if (currentFile.endsWith('.html')) {
                // Redirige a la versión en ESPAÑOL (ej: about-us.html -> about-us-es.html)
                newFile = currentFile.replace('.html', '-es.html');
            }

            // 2. Redirige a la nueva URL
            if (newFile) {
                window.location.href = newFile;
            }
        });
    }