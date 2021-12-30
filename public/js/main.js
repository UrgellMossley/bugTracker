/* script file allowing for dom manipulation and nav/animation effects */

//DOM element selection
const hamburgerBtn = document.querySelector(`.hamburger-btn`)
const linksContainer = document.querySelector(`.navbar`)

hamburgerBtn.addEventListener(`click`,()=>{
    linksContainer.classList.toggle(`hidden-item`)
})