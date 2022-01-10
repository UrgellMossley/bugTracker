/* simple script to aid styling of table*/
//query selector for each table row
const tableRow = document.querySelectorAll(`.row`);
const arr = [...tableRow]

//function to identify whether any rows have the highlight class if so remove, and then togle on and of the class, may need to be an or statement to get optimal use
const highlightRow = (el,e, row) => {
    const selected = document.querySelector(`.highlighted-row`)
    e.target 
    if (selected ||  selected && e.target.parentNode !== row) {
        selected.classList.remove(`highlighted-row`)
    }
    el.classList.toggle(`highlighted-row`)
};
//conditional to select each even row
//if row is even then apply class that changes background of the cells in that row
arr.forEach(row => {
    if ((arr.indexOf(row) + 1) % 2 === 0) row.classList.add(`rowStyle`)
    row.addEventListener(`click`, e => {
    return highlightRow(row,e)
    })
});
