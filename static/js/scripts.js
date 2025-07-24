const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'awards', 'experience', 'publications'];


window.addEventListener('DOMContentLoaded', event => {
    
    // Theme toggle functionality
    initThemeToggle();
    
    // Click effect functionality
    initClickEffect();

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // MathJax
                MathJax.typeset();
            })
            .catch(error => console.log(error));
    })

}); 

// Theme toggle function
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Apply theme immediately to prevent flash
    if (currentTheme === 'dark') {
        body.style.backgroundColor = '#1a1a1a';
        body.style.color = '#e0e0e0';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation to indicate theme change
        body.style.transition = 'all 0.3s ease';
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        themeIcon.className = 'bi bi-moon-fill';
    } else {
        themeIcon.className = 'bi bi-sun-fill';
    }
}

// Click effect function
function initClickEffect() {
    document.addEventListener('click', (e) => {
        // Skip if clicking on the theme toggle button
        if (e.target.closest('#themeToggle')) {
            return;
        }
        
        // Create ripple effect element
        const ripple = document.createElement('div');
        ripple.className = 'click-effect';
        
        // Add different classes based on what was clicked
        if (e.target.tagName === 'BUTTON') {
            ripple.classList.add('button-click');
        } else if (e.target.tagName === 'A' || e.target.closest('a')) {
            ripple.classList.add('link-click');
        }
        
        // Position the ripple at click coordinates
        ripple.style.left = (e.clientX - 10) + 'px';
        ripple.style.top = (e.clientY - 10) + 'px';
        
        // Add to body
        document.body.appendChild(ripple);
        
        // Remove after animation completes
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    });
    
    // Add special effect for theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', (e) => {
        // Create a special ripple for theme toggle
        const ripple = document.createElement('div');
        ripple.className = 'click-effect';
        ripple.style.background = 'radial-gradient(circle, #ffd700 0%, transparent 70%)';
        
        const rect = themeToggle.getBoundingClientRect();
        ripple.style.left = (rect.left + rect.width / 2 - 10) + 'px';
        ripple.style.top = (rect.top + rect.height / 2 - 10) + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    });
}
