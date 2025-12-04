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

const langButton = document.querySelector('.bttn-lang-sel');

if (langButton) {
    langButton.addEventListener('click', function(e) {
        // Previene la acción por defecto, nos da control total sobre la navegación
        e.preventDefault(); 

        // 1. EXTRAE EL NOMBRE DEL ARCHIVO DE LA URL (método robusto)
        const pathParts = window.location.pathname.split('/');
        let currentFile = pathParts[pathParts.length - 1];
        
        // Maneja el caso de la raíz (ej: la URL termina en /)
        if (currentFile === '' || currentFile.endsWith('/')) {
            currentFile = 'index.html'; 
        }
        
        let newFile = '';

        // 2. LÓGICA DE REEMPLAZO SIMPLE Y CONSISTENTE (Funciona con el sufijo -es)
        
        // Si la página actual es la versión ESPAÑOLA (tiene el sufijo -es)
        if (currentFile.endsWith('-es.html')) {
            // SPANISH -> ENGLISH: Quita el sufijo '-es'
            newFile = currentFile.replace('-es.html', '.html');
        } 
        // Si la página actual es la versión INGLESA (no tiene el sufijo)
        else {
            // ENGLISH -> SPANISH: Agrega el sufijo '-es'
            newFile = currentFile.replace('.html', '-es.html');
        }

        // 3. REDIRIGE
        if (newFile) {
            // Usamos window.location.replace() en lugar de window.location.href. 
            // Esto es más seguro porque reemplaza la entrada actual en el historial, 
            // lo que ayuda a evitar problemas de caché en Chrome.
            window.location.replace(newFile); 
        }
    });
}