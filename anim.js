const themeBtn = document.querySelector('.themeBtn');
const section = document.querySelector('section');
const lancer = document.querySelector('.lancer');
const pageUn = document.querySelector('.pageUn');
const pageDeux = document.querySelector('.pageDeux');
const form = document.querySelector('form');
const backHome = document.querySelector('.fa-arrow-left');



themeBtn.addEventListener('click', () => {
        themeBtn.classList.toggle('activeBgTheme');
        section.classList.toggle('backgroundTheme')
})

function lancement() {
        setTimeout(()=>{
                pageUn.style.display = 'none'
                pageDeux.style.display = 'grid'
        }, 1000)

}


backHome.addEventListener('click', () => {
        pageUn.style.display = 'flex'
        pageDeux.style.display = 'none'
})