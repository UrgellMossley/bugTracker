/* simple script to aid styling of table*/
//query selector for each table row
const tableRow = document.querySelectorAll(`.row`);
const arr = [...tableRow];
const displayFormBtn = document.querySelector(`#display-form`);
const newCaseSection = document.querySelector(`#new-case`);

//function to identify whether any rows have the highlight class if so remove, and then togle on and of the class, may need to be an or statement to get optimal use
const highlightRow = (el,e, row) => {
    const selected = document.querySelector(`.highlighted-row`)
    e.target 
    if (selected ||  selected && e.target.parentNode !== row) {
        selected.classList.remove(`highlighted-row`)
    }
    el.classList.toggle(`highlighted-row`)
};
//function that toggles display none and flex by adding and removing classes
const displayForm = () =>{
    newCaseSection.classList.toggle(`no-display`);
    newCaseSection.classList.contains(`no-display`) ? displayFormBtn.textContent = `Create New Case` : displayFormBtn.textContent = `Hide`
    return
};
//event listener to listen for clicks to create form btn. If clicked make section appear
displayFormBtn.addEventListener(`click`, displayForm)

//conditional to select each even row
//if row is even then apply class that changes background of the cells in that row
arr.forEach(row => {
    if ((arr.indexOf(row) + 1) % 2 === 0) row.classList.add(`rowStyle`)
    row.addEventListener(`click`, e => {
    return highlightRow(row,e)
    })
});
