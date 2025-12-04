document.addEventListener('DOMContentLoaded', function() {

    // =================================================================
    // 1. LÓGICA DEL MENÚ DESPLEGABLE (Dropdown Menu) Y EL BOTÓN 'MENÚ'
    // =================================================================
    const header = document.getElementById('header');
    const menuContainer = document.getElementById('dropdown-menu');
    const menuButton = document.querySelector('.bttn-all-menu');
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
        if (trigger.textContent.trim().toUpperCase() === 'HOME') {
            return;
        }
        trigger.addEventListener('mouseover', function() {
            if (window.innerWidth > 992) {
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
            if (e.target.tagName === 'A' || e.target === menuContainer) {
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
    // 3. LÓGICA DE CAMBIO DE IDIOMA (Corregida para URLs Limpias/Live)
    // =================================================================
    const langButton = document.querySelector('.bttn-lang-sel');

    if (langButton) {
        langButton.addEventListener('click', function(e) {
            e.preventDefault(); 

            // Obtiene la RUTA COMPLETA (ej: '/index-es' o '/about-us-es.html')
            const currentPath = window.location.pathname;
            let newPath = '';

            // 1. Detección de Idioma (Busca si la ruta CONTIENE el sufijo '-es')
            const isSpanish = currentPath.includes('-es'); 
            
            if (isSpanish) {
                // SPANISH -> ENGLISH (Quita el sufijo '-es')
                newPath = currentPath.replace('-es', ''); 
                
                // Si al quitar '-es', la ruta queda en '/' (la página principal)
                if (newPath === '/') {
                    // Mantiene '/', el servidor debe manejarlo como index.html
                    newPath = '/'; 
                }
            } else {
                // ENGLISH -> SPANISH (Añade el sufijo '-es')
                
                // Si la URL es la raíz ('/')
                if (currentPath === '/') {
                    newPath = '/index-es'; // Redirige directamente a la URL limpia de inicio
                }
                // Si la URL tiene extensión (.html) -> Añade -es antes de .html (Local)
                else if (currentPath.endsWith('.html')) {
                    newPath = currentPath.replace('.html', '-es.html');
                }
                // Si es una URL limpia sin extensión (Live)
                else {
                    newPath = currentPath + '-es';
                }
            }
            
            // 2. Redirige.
            if (newPath) {
                // window.location.replace() es más seguro para evitar problemas de caché en Chrome.
                window.location.replace(newPath); 
            }
        });
    }
});