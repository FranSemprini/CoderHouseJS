
const selected = (element) => {
    restoreSelected()
    let selected = document.querySelector(element);
    selected.classList.replace(`unselected`, `selected`)
}

const restoreSelected = () => {
    let list = document.querySelectorAll(`.opt`)
    list.forEach(element => {
        element.classList.contains(`selected`) && element.classList.replace(`selected`, `unselected`)
    })
}

const subSelected = (active, nonActive) => {
    active.classList.add(`subMenu`)
    nonActive.classList.remove(`subMenu`)
    active === nonActive && active.classList.remove(`subMenu`)
}
