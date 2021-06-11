const projectLink = document.querySelectorAll('.project-link');

const showBracket = (element) => {
    const bracket = document.createElement('span');
    bracket.textContent = '<';
    element.appendChild(bracket);
};
const removeBracket = (element) => {
    element.lastChild.remove();
};

projectLink.forEach((link, index) => {
    link.addEventListener('mouseover', () => showBracket(link));
    link.addEventListener('mouseout', () => removeBracket(link));
});
