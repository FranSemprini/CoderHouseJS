const ingresaDatos = document.querySelector(`#ingresaDatos`)
const visualizaDatos = document.querySelector(`#visualizaDatos`)
const moverRaton = document.querySelector(`#moverRaton`)
const titulo = document.querySelector(`#titulo`)
const formSelect = document.querySelector(`#formSelect`)
const formSelect2 = document.querySelector(`#formSelect2`)
const formSelect3 = document.querySelector(`#formSelect3`)


// FORMULARIO PRINCIPAL

const creaFormularioIngreso = () => {
    limpiaHoja(0, 1, 2, 3)
    selected(`.opt1`)
    const div = document.createElement('div')
    div.innerHTML = `<ul class="d-flex d-flex flex-column form__ul animateMenu">
    <li><a id="selectJaula" class="selectJaula sub1" href="javascript:void(0)">Jaula</a></li>
    <li><a id="selectRaton" class="sub2" href="javascript:void(0)">Raton</a></li>
</ul>`
    formSelect.append(div)
    selectJaula = document.querySelector(`#selectJaula`);
    selectRaton = document.querySelector(`#selectRaton`);
    selectJaula.addEventListener(`click`, (e) => {
        creaJaula()
        subSelected(selectJaula, selectRaton)
    })
    selectRaton.addEventListener(`click`, (e) => {
        creaRaton()
        subSelected(selectRaton, selectJaula)
    })
}

// FORMULARIO DE CREACION DE JAULAS

const creaJaula = () => {
    const div = document.createElement('div')
    limpiaHoja(0, 2, 3)
    div.innerHTML = `    <form id="myForm" action="" class="myForm pt-3 gap-3">
    <div class="d-flex flex-row align-items-center gap-3">
        <select class="form-select" aria-label="" id="tipo">
            <option value="parental">Parents</option>
            <option value="noparental">Pups</option>
        </select>
    </div>
    <div class="d-flex flex-row align-items-center gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <input type="number" class="form-control barcodeToBeScanned" placeholder="Barcode" id="barcode">
            <a class="camIcon" id="camButton"><i class="fa fa-camera fa-xl" aria-hidden="true"></i></a>
        </div>
    </div>
    <div class="d-flex flex-row align-items-center gap-3">
        <input type="text" id="nombre" class="form-control" placeholder="Name">
    </div>
    <div class="d-flex flex-row align-items-center gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <label for="date">Date</label>
            <input id="date" class="form-control" type="date" />
        </div>
    </div>
    <div class="d-flex w-100 justify-content-center">
        <button id="bsubmit" type="submit" class="btn btn-primary disabled">Submit</button>
    </div>
</form>`
    mainContainer.append(div)
    addFromCamera()
    formValidation(`#barcode`, `jaula`) 
    myForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        let tipoJula = tipo.value
        let dateJaula = fechaToArray(date.value)
        let nombreJaula = nombre.value
        let barcodeJaula = barcode.value
        jaulas.push(new Jaula(idJaula, tipoJula, dateJaula, barcodeJaula, nombreJaula))
        limpiaHoja(0)
        if (buscaJaula(barcodeJaula).barcode == barcodeJaula && barcodeJaula !== "") {
            toastify(`La jaula con el codigo ${barcodeJaula} se creo correctamente.`, "linear-gradient(to right, #00b09b, #96c93d)")
            jaulas[0].idJaula++
            pushAlltoFB()
            subSelected(selectJaula, selectJaula)
        } else {
            toastify("No se pudo crear la jaula, revisa los datos.", "")
        }
    })
}

// FORMULARIOS DE CREACION DE RATONES

const creaRaton = () => {
    const div = document.createElement(`div`)
    limpiaHoja(0, 3)
    div.innerHTML = `<form id="myForm" action="" class="myForm pt-3">
    <div class="d-flex flex-row">
        <select class="form-select mx-2" aria-label="" id="aBuscar">
            <option value="">Raton a crear</option>
            <option value="selectParental">Parent</option>
            <option value="selectNoParental">Pup</option>
        </select>
    </div>
    </form>`
    formSelect3.append(div)
    aBuscar.addEventListener("change", (e) => {
        switch (aBuscar.value) {
            case `selectParental`:
                creaParental()
                break
            case `selectNoParental`:
                creaNoParental()
        }
    })
}

const creaParental = () => {
    const div = document.createElement(`div`)
    tipoRatonValue = ``
    limpiaHoja(0)
    div.innerHTML = `    <form id="myForm2" action="" class="myForm pt-3 gap-3">
    <div class="d-flex flex-row align-items-center gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <label for="barcode">Barcode</label>
            <select class="form-select aValidar" aria-label="barcode" id="barcode2"></select>
        </div>
        <div class="d-flex w-100 align-items-center gap-1">
        <select class="form-select toDisable" aria-label="" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        </div>
    </div>
    <div class="d-flex flex-row align-items-center gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <label for="genA">Gen 1</label>
            <select class="form-select toDisable" aria-label="" id="genA">
                <option value="CAG-CRE">CAG-CRE</option>
                <option value="COL1A1-CRE">COL1A1-CRE</option>
                <option value="COL1A2-CRE">COL1A2-CRE</option>
                <option value="ACTA2-CRE">ACTA2-CRE</option>
                <option value="Nestin-CRE">Nestin-CRE</option>
            </select>
        </div>
        <div class="d-flex w-100 align-items-center gap-1">
        <select class="form-select" aria-label="" id="genAS">
            <option value="+">+</option>
            <option value="-">-</option>
        </select>
        </div>
    </div>
    <div class="d-flex flex-row align-items-center gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <label for="genB">Gen 2</label>
            <select class="form-select toDisable" aria-label="" id="genB">
                <option value="LAIR1 FLOXED">LAIR1 FLOXED</option>
                <option value="COL1A1 FLOXED">COL1A1 FLOXED</option>
                <option value="Tomato">Tomato</option>
            </select>
        </div>
        <div class="d-flex w-100 align-items-center gap-1">
        <select class="form-select" aria-label="" id="genBS">
            <option value="++">++</option>
            <option value="+-">+-</option>
            <option value="--">--</option>
        </select>
        </div>
    </div>
    <div class="d-flex w-100 align-items-center gap-1">
        <label for="date">Date</label>
        <input id="date" class="form-control" type="date" />
    </div>
    <div class="d-flex w-100 justify-content-center">
        <button id="bsubmit" type="submit" class="btn btn-primary disabled">Submit</button>
    </div>
</form>`
    mainContainer.append(div)
    creOptVacias(`parental`, `#barcode2`)
    formValidation(`#barcodeRaton`, `parental`)
    barcodeCheck = document.querySelector(`#barcode2`)
    asignGen()
    barcodeCheck.addEventListener(`change`, (e) => {
        asignGen()
    })
    myForm2.addEventListener(`submit`, (e) => {
        e.preventDefault();
        let barcodeRaton = barcode2.value
        let dateRaton = fechaToArray(date.value)
        let genRaton = [genA.value, genAS.value, genB.value, genBS.value]
        let genderRaron = gender.value
        clearFalse(barcodeRaton, `parents`)
        let parentsBefore = buscaJaula(barcodeRaton).parents.length
        jaulas[0].idRaton++
        buscaJaula(barcodeRaton).parents.push(new Raton(jaulas[0].idRaton, `parent`, genRaton, dateRaton, genderRaron, `none`, barcodeRaton, `none`))
        if (buscaJaula(barcodeRaton).parents.length === parentsBefore + 1) {
            toastify(`El raton parental se añadio a la jaula ${barcodeRaton}`, "linear-gradient(to right, #00b09b, #96c93d)")
            pushAlltoFB()
            subSelected(selectRaton, selectRaton)
        } else {
            toastify("No se pudo crear la jaula, revisa los datos.", "")
        }
        limpiaHoja(0, 3)
    })
}

const creaNoParental = () => {
    const div = document.createElement(`div`)
    tipoRatonValue = ``
    limpiaHoja(0)
    div.innerHTML = `    <form id="myForm2" action="" class="myForm pt-3 gap-3">
    <div class="d-flex flex-row align-items-center gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <label for="barcode">Barcode</label>
            <select class="form-select" aria-label="barcode" id="barcode"></select>
        </div>
        <div class="d-flex w-100 align-items-center gap-1">
            <select class="form-select" aria-label="" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
    </div>
    <div class="d-flex flex-row gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <input type="number" class="form-control aValidar barcodeToBeScanned" placeholder="Barcode Padres"
                id="barcodePadres">
            <a class="camIcon" id="camButton"><i class="fa fa-camera fa-xl" aria-hidden="true"></i></a>
        </div>
        <div class="d-flex w-100 align-items-center gap-1">
            <select class="form-select aValidar" aria-label="" id="amount">
                <option value="">Crias</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    </div>
    <div class="d-flex w-100 align-items-center gap-1">
        <label for="date">Date</label>
        <input id="date" class="form-control" type="date" />
    </div>
    <div class="d-flex w-100 justify-content-center">
        <button id="bsubmit" type="submit" class="btn btn-primary disabled">Submit</button>
    </div>
</form>`
    mainContainer.append(div)
    creOptVacias(`noparental`, `#barcode`)
    addFromCamera()
    formValidation(`#barcodePadres`, `noparental`)
    myForm2.addEventListener(`submit`, (e) => {
        e.preventDefault();
        let barcodeRaton = barcode.value
        let barcodePadresRaton = barcodePadres.value
        let dateRaton = fechaToArray(date.value)
        let genderRaron = gender.value
        let criasRaton = amount.value
        let gen = calculaGenes2(barcodePadresRaton)
        clearFalse(barcodeRaton, `pups`)
        let pupsBefore = buscaJaula(barcodeRaton).pups.length
        for (i = 0; i < criasRaton; i++) {
            jaulas[0].idRaton++
            buscaJaula(barcodeRaton).pups.push(new Raton(jaulas[0].idRaton, `pup`, gen, dateRaton, genderRaron, asignEarCode(i), barcodeRaton,))
            buscaJaula(barcodeRaton).pups[i].previousBarcode[0] === false && buscaJaula(barcodeRaton).pups[i].previousBarcode.splice(0,1)
            buscaJaula(barcodeRaton).pups[i].previousBarcode.push(barcodePadresRaton)
        }
        if (buscaJaula(barcodeRaton).pups.length > pupsBefore) {
            criasRaton > 1 ? toastify(`${criasRaton} pups se añadieron a la jaula ${barcodeRaton}`, "linear-gradient(to right, #00b09b, #96c93d)") : toastify(`${criasRaton} pup se añadio a la jaula ${barcodeRaton}`, "linear-gradient(to right, #00b09b, #96c93d)")
            pushAlltoFB()
            subSelected(selectRaton, selectRaton)
        } else {
            toastify("No se pudo crear la jaula, revisa los datos.", "")
        }
        limpiaHoja(0, 3)
    })
}

// FORMULARIOS DE BUSQUEDA

const creaFormularioBusqueda = () => {
    limpiaHoja(0, 1, 2, 3)
    selected(`.opt2`)
    const div = document.createElement('div')
    div.innerHTML = `<ul class="d-flex flex-column form__ul animateMenu">
    <li><a id="selectJaula" class="selectJaula" href="javascript:void(0)">Jaula</a></li>
    <li><a id="selectRaton" href="javascript:void(0)">Raton</a></li>
</ul>`
    formSelect.append(div)
    selectJaula = document.querySelector(`#selectJaula`);
    selectRaton = document.querySelector(`#selectRaton`);
    selectJaula.addEventListener(`click`, (e) => {
        searchJaula()
        subSelected(selectJaula, selectRaton)
    })
    selectRaton.addEventListener(`click`, (e) => {
        searchRaton()
        subSelected(selectRaton, selectJaula)
    })
}

const searchRaton = () => {
    const div = document.createElement(`div`)
    limpiaHoja(0, 3)
    div.innerHTML = `<form id="myForm" action="" class="myForm pt-3 gap-3">
    <div class="d-flex flex-row align-items-center gap-3">
        <select class="form-select" aria-label="" id="aBuscar">
            <option value="">Valor a Buscar</option>
            <option value="barcodeAntetior">Barcode Anterior</option>
            <option value="gen">Gen</option>
        </select>
    </div>
</form>`
    formSelect3.append(div)
    aBuscar.addEventListener("change", (e) => {
        switch (aBuscar.value) {
            case `barcodeAntetior`:
                buscarBarcodeAnteriorRaton()
                break
            case `gen`:
                buscaGenesRaton()
                break
        }
    })
}

const buscarBarcodeAnteriorRaton = () => {
    const div = document.createElement(`div`)
    limpiaHoja(0)
    div.innerHTML = `
    <form id="myForm2" action="" class="myForm pt-3 gap-3">
        <div class="d-flex flex-row gap-3">
            <div class="d-flex w-100">
                    <input type="number" class="form-control barcodeToBeScanned" placeholder="Barcode" id="data">
                    <a class="camIcon" id="camButton"><i class="fa fa-camera fa-xl" aria-hidden="true"></i></a>
                </div>
            </div>
        <button type="submit" class="btn btn-primary pt-3">Submit</button>
    </form>
`
    mainContainer.append(div)
    addFromCamera()
    myForm2.addEventListener(`submit`, (e) => {
        limpiaHoja(3)
        e.preventDefault();
        muestraRatones(`previousBarcode`, data.value)
    })
}

const buscaGenesRaton = () => {
    const div = document.createElement(`div`)
    limpiaHoja(0)
    div.innerHTML = `    <form id="myForm2" action="" class="myForm pt-3 gap-3">
    <div class="d-flex flex-row align-items-center gap-3">
        <select class="form-select" aria-label="" id="tipo">
            <option value="parents">Parent</option>
            <option value="pups">Pups</option>
        </select>
    </div>
    <div class="d-flex flex-row align-items-center gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <label for="genA">Gen 1</label>
            <select class="form-select" aria-label="" id="genA">
                <option value="any">Any</option>
                <option value="CAG-CRE">CAG-CRE</option>
                <option value="COL1A1-CRE">COL1A1-CRE</option>
                <option value="COL1A2-CRE">COL1A2-CRE</option>
                <option value="ACTA2-CRE">ACTA2-CRE</option>
                <option value="Nestin-CRE">Nestin-CRE</option>
            </select>
        </div>
        <div class="d-flex w-100 align-items-center gap-1">
        <select class="form-select" aria-label="" id="genAS">
            <option value="any">Any</option>
            <option value="+">+</option>
            <option value="-">-</option>
        </select>
        </div>
    </div>
    <div class="d-flex flex-row align-items-center gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <label for="genB">Gen 2</label>
            <select class="form-select" aria-label="" id="genB">
                <option value="any">Any</option>
                <option value="LAIR1 FLOXED">LAIR1 FLOXED</option>
                <option value="COL1A1 FLOXED">COL1A1 FLOXED</option>
                <option value="Tomato">Tomato</option>
            </select>
        </div>
        <div class="d-flex w-100 align-items-center gap-1">
        <select class="form-select" aria-label="" id="genBS">
            <option value="any">Any</option>
            <option value="++">++</option>
            <option value="+-">+-</option>
            <option value="--">--</option>
        </select>
        </div>
    </div>
    <div class="d-flex w-100 justify-content-center">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</form>`
    mainContainer.append(div)
    myForm2.addEventListener(`submit`, (e) => {
        limpiaHoja(3)
        e.preventDefault();
        genAll = [genA.value, genAS.value, genB.value, genBS.value]
        muestraRatones(`gen`, genAll, tipo.value)
    })
}

const searchJaula = () => {
    const div = document.createElement(`div`)
    limpiaHoja(0, 3)
    div.innerHTML = `
    <form id="myForm" action="" class="myForm pt-3 gap-3">
        <div class="d-flex flex-row gap-3">
            <div class="d-flex w-50 align-items-center gap-1">
                <select class="form-select" aria-label="" id="tipo">
                    <option value="todos">Todos</option>
                    <option value="parental">Parental</option>
                    <option value="noparental">No Parental</option>
                </select>
            </div>
            <div class="d-flex flex-row gap-3 w-50">
                <div class="d-flex w- align-items-center w-100 gap-1">
                    <input type="number" class="form-control barcodeToBeScanned" placeholder="Barcode" id="barcode">
                    <a class="camIcon" id="camButton"><i class="fa fa-camera fa-xl" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
        <div class="d-flex w-100 justify-content-center">
        <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>`
    mainContainer.append(div);
    addFromCamera()
    myForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        let tipoJulaABuscar = tipo.value
        let barcodeABuscar = barcode.value
        let jaulasAMostrar = []
        mainContainer.innerHTML = '';
            if (tipoJulaABuscar !== "todos" && barcodeABuscar !== "") {
                jaulasAMostrar = jaulas.filter(e => e.tipo === tipoJulaABuscar)
                jaulasAMostrar = jaulasAMostrar.filter(e => e.barcode === barcodeABuscar)
            } else if (tipoJulaABuscar === "todos" && barcodeABuscar !== "") {
                jaulasAMostrar = jaulas.filter(e => e.barcode === barcodeABuscar)
            } else if (tipoJulaABuscar !== "todos" && barcodeABuscar === "") {
                jaulasAMostrar = jaulas.filter(e => e.tipo === tipoJulaABuscar)
            } else if (tipoJulaABuscar === `todos`) {
                jaulasAMostrar = jaulas
            }
        muestraJaulas(jaulasAMostrar)
    })
}

// FORMULARIOS PARA EL MOVIMIENTO DE RATONES

const creaFormularioMoverRaton = () => {
    const div = document.createElement(`div`)
    selected(`.opt3`)
    limpiaHoja(0, 1, 2, 3)
    div.innerHTML = `
    <form id="myForm" action="" class="myForm pt-3 gap-3">
        <div class="d-flex flex-row align-items-center gap-3">
            <div class="d-flex w-50 align-items-center gap-1">
                <input type="number" class="form-control aValidar barcodeToBeScanned" placeholder=" Jaula Anterior"
                    id="esJaulaAnterior">
                <a class="camIcon" id="camButton"><i class="fa fa-camera fa-xl" aria-hidden="true"></i></a>
            </div>
            <div class="d-flex align-items-center w-50 gap-1">
                <select class="form-select aValidar" aria-label="" id="orejaRaton"></select>
            </div>
        </div>

            <div class="d-flex w-100 align-items-center gap-1">
                <label for="nuevaJaula">Mover a Jaula:</label>
                <select class="form-select" aria-label="nuevaJaula" id="nuevaJaula"></select>
            </div>

        <div class="d-flex w-100 justify-content-center">
            <button id="bsubmit" type="submit" class="btn btn-primary disabled">Submit</button>
        </div>
    </form>`
    mainContainer.append(div);
    const esJaulaAnterior = document.querySelector(`#esJaulaAnterior`)
    creOptVacias(`parental`, `#nuevaJaula`)
    esJaulaAnterior.addEventListener(`change`, () => {
        if (buscaJaula(esJaulaAnterior.value) != undefined && buscaJaula(esJaulaAnterior.value).pups[0] !== false ) {
            orejaRaton.innerHTML = ``
            creOptVacias(``, `#orejaRaton`, esJaulaAnterior.value)
        }
    })

    addFromCamera()
    formValidation(`#esJaulaAnterior`, `mover`)
    myForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        let jaulaAnteriorValue = esJaulaAnterior.value
        let buscaOrejaRaton = orejaRaton.value
        let jaulaNuevaValue = nuevaJaula.value
        let pupsBefore = buscaJaula(jaulaAnteriorValue).pups.length
        clearFalse(jaulaNuevaValue, `parents`)
        let parentsBefore = buscaJaula(jaulaNuevaValue).parents.length
        mueveRaton(jaulaAnteriorValue, buscaOrejaRaton, jaulaNuevaValue)
        mainContainer.innerHTML = ''
        if (buscaJaula(jaulaAnteriorValue).pups.length  === pupsBefore - 1 && buscaJaula(jaulaNuevaValue).parents.length === parentsBefore + 1) {
            toastify(`El raton con codigo ${buscaOrejaRaton} se movio como padre a la jaula parental ${jaulaNuevaValue}`, "linear-gradient(to right, #00b09b, #96c93d)") 
            pushAlltoFB()
        } else {
            toastify(` asdasd `, "linear-gradient(to right, #00b09b, #96c93d)")
        }
    })

}

