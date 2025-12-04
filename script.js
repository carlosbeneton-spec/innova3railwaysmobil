document.addEventListener('DOMContentLoaded', function() {

    // =================================================================
    // 1. LÓGICA DEL MENÚ DESPLEGABLE (Dropdown Menu) Y EL BOTÓN 'MENÚ'
    // =================================================================
    const header = document.getElementById('header');
    const menuContainer = document.getElementById('dropdown-menu');
    const menuButton = document.querySelector('.bttn-all-menu');
    
    // Obtenemos los enlaces del menú de escritorio para la función hover
    const desktopMenuTriggers = document.querySelectorAll('.gnb-menu-list > li > a');

    function showDropdown() {
        if (menuContainer) {
            menuContainer.classList.add('visible');
        }
    }

    function hideDropdown() {
        if (menuContainer) {
            menuContainer.classList.remove('visible');
        }
    }
    
    // Toggle del menú al hacer clic en 'MENÚ'
    if (menuButton) {
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            menuContainer.classList.contains('visible') ? hideDropdown() : showDropdown();
        });
    }
    
    // Lógica de HOVER para escritorio
    desktopMenuTriggers.forEach(trigger => {
        // Excluimos 'HOME' de abrir el menú con hover
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

    // Cierra el menú si se hace clic en el fondo/overlay o en un enlace
    if (menuContainer) {
        menuContainer.addEventListener('click', function(e) {
            // Si el clic es directamente en el contenedor o en un enlace (A)
            if (e.target.tagName === 'A' || e.target === menuContainer) {
                // Pequeño retraso para permitir la navegación antes de cerrar
                setTimeout(hideDropdown, 150); 
            }
        });
    }


    // =================================================================
    // 2. LÓGICA DEL CAMBIO DE PESTAÑAS (Tabs)
    // =================================================================
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

    // Activa la pestaña inicial basada en el hash de la URL (si existe)
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


    // =================================================================
    // 3. LÓGICA DE CAMBIO DE IDIOMA (Simple y Robusta con -es)
    // =================================================================
    const langButton = document.querySelector('.bttn-lang-sel');

    if (langButton) {
        langButton.addEventListener('click', function(e) {
            e.preventDefault(); 

            // Extrae el nombre del archivo de la URL
            const pathParts = window.location.pathname.split('/');
            let currentFile = pathParts[pathParts.length - 1];
            
            // Maneja el caso de la raíz (si la URL es solo /)
            if (currentFile === '' || currentFile.endsWith('/')) {
                currentFile = 'index.html'; 
            }
            
            let newFile = '';

            // Si la página actual es la versión ESPAÑOLA (tiene el sufijo -es)
            if (currentFile.endsWith('-es.html')) {
                // SPANISH -> ENGLISH: Quita el sufijo '-es' (Ej: about-us-es.html -> about-us.html)
                newFile = currentFile.replace('-es.html', '.html');
            } 
            // Si la página actual es la versión INGLESA (no tiene el sufijo)
            else {
                // ENGLISH -> SPANISH: Agrega el sufijo '-es' (Ej: about-us.html -> about-us-es.html)
                newFile = currentFile.replace('.html', '-es.html');
            }

            // Redirige
            if (newFile) {
                // Usamos replace para evitar problemas de caché y de historial de navegación en Chrome.
                window.location.replace(newFile); 
            }
        });
    }
});