//dom declarations
const textBox = document.querySelector(`textarea`);
const btn = document.querySelector(`#submit-comment`);

//simple script to add transition and make items appear
textBox.addEventListener(`click`, ()=>{
    textBox.style.transition = `height 0.2s ease-in`;
    textBox.style.height = `20rem`;
    btn.classList.remove(`hidden`)
    return 
})

