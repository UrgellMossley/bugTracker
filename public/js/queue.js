/* simple script to aid styling of table*/
//query selector for each table row
const tableRow = document.querySelectorAll(`.row`);
const arr = [...tableRow]

const highlightRow = (el) =>{
   const selected = document.querySelector(`.highlighted-row`)
    if (selected){
        selected.classList.remove(`highlighted-row`)

    }
    el.classList.toggle(`highlighted-row`)
}
//conditional to select each even row
//if row is even then apply class that changes background of the cells in that row
arr.forEach(row=>{
    if ((arr.indexOf(row) + 1) % 2 === 0) row.classList.add(`rowStyle`)
    row.addEventListener(`click`,e=>{
        highlightRow(row)
        console.log(e.target.parentNode)
    })
})
