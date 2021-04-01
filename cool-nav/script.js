const menuBars = document.querySelector('#menu-bars');
const overlay = document.querySelector('#overlay');
const nav1 = document.querySelector('#nav-1');
const nav2 = document.querySelector('#nav-2');
const nav3 = document.querySelector('#nav-3');
const nav4 = document.querySelector('#nav-4');
const nav5 = document.querySelector('#nav-5');

const navItems = [nav1, nav2, nav3, nav4, nav5];

/**
 * Iterate @name{navItems} and apply slide 'in' or 'out' class
 * On-load is 'out' (defined on html)
 * @param {string} direction1 - 'in' || 'out'
 * @param {string} direction2 - 'in' || 'out'
 */
function navAnimation(direction1, direction2) {
    navItems.forEach((nav, i) => {
        nav.classList.replace(
            `slide-${direction1}-${i + 1}`,
            `slide-${direction2}-${i + 1}`
        );
    });
}

function toggleNav() {
    // Toggle menu bars open/closed
    menuBars.classList.toggle('change');
    // Toggle menu active
    overlay.classList.toggle('overlay-active');
    if (overlay.classList.contains('overlay-active')) {
        // Animate in -- overlay
        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
        // Animate in -- nav items
        navAnimation('out', 'in');
    } else {
        // Animate out -- overlay
        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        // Animate out -- nav items
        navAnimation('in', 'out');
    }
}

menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => nav.addEventListener('click', toggleNav));
