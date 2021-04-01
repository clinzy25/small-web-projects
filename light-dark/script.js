const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.querySelector('nav');
const toggleIcon = document.querySelector('#toggle-icon');
const image1 = document.querySelector('#image1');
const image2 = document.querySelector('#image2');
const image3 = document.querySelector('#image3');
const textBox = document.querySelector('#text-box');

/**
 * Swaps image versions
 * @param{string} color - set by @function toggleLightDarkMode
 */
function imageMode(color) {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

/**
 * Apply dark mode styles and content changes
 * @param {bool} isDark - set from local storage @event on-load,
 * Or @function switchTheme on @event click @var toggleSwitch
 */
function toggleLightDarkMode(isDark) {
    nav.style.backgroundColor = isDark
        ? 'rgb(0 0 0 / 50%)'
        : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDark
        ? 'rgb(255 255 255 / 50%)'
        : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    isDark
        ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
        : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    isDark ? imageMode('dark') : imageMode('light');
}

/**
 * Switch theme dynamically on @event click @var toggleSwitch
 */
function switchTheme() {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleLightDarkMode(true);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleLightDarkMode(false);
    }
}

toggleSwitch.addEventListener('change', switchTheme);
nav.addEventListener('click', () => setAttribute('hidden'));

/**
 * Check local storage for theme
 */
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        toggleLightDarkMode(true);
    }
}

/**
 * When the user scrolls down, hide the navbar.
 * When the user scrolls up, show the navbar
 */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        nav.style.top = '0';
    } else {
        nav.style.top = '-210px';
    }
    prevScrollpos = currentScrollPos;
};
