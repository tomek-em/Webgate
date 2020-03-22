function toggleMenu() {
    document.querySelector('#navbarsExampleDefault').classList.toggle('show');
    document.querySelector('nav').classList.toggle('bg_dark');
}    
    
document.querySelector('#hamburger').addEventListener('click', toggleMenu); 