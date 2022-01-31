/* script file allowing for dom manipulation and nav/animation effects */

//DOM element selection
const hamburgerBtn = document.querySelector(`.hamburger-btn`)
const navlist = document.querySelector(`.nav-container`)
const nodeContainer = document.querySelector(`.container`)

hamburgerBtn.addEventListener(`click`,()=>{
    navlist.classList.toggle(`hidden-item`)

})