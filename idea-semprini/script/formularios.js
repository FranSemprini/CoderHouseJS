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
    const div = document.createElement('div')
    div.innerHTML = `<ul class="d-flex justify-content-around form__ul">
    <li><a id="selectJaula" class="selectJaula" href="javascript:void(0)">Jaula</a></li>
    <li><a id="selectRaton" href="javascript:void(0)">Raton</a></li>
</ul>`
    formSelect.append(div)
    selectJaula = document.querySelector(`#selectJaula`);
    selectRaton = document.querySelector(`#selectRaton`);
    selectJaula.addEventListener(`click`, (e) => {
        creaJaula()
    })
    selectRaton.addEventListener(`click`, (e) => {
        creaRaton()
    })
}

// FORMULARIO DE CREACION DE JAULAS

const creaJaula = () => {
    const div = document.createElement('div')
    limpiaHoja(0, 2, 3)
    div.innerHTML = `    <form id="myForm" action="" class="myForm mt-3 gap-3">
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
        idJaula++
        if (buscaJaula(barcodeJaula).barcode == barcodeJaula && barcodeJaula !== "") {
            toastify(`La jaula con el codigo ${barcodeJaula} se creo correctamente.`, "linear-gradient(to right, #00b09b, #96c93d)")
        } else {
            toastify("No se pudo crear la jaula, revisa los datos.", "")
        }
    })
}

// FORMULARIOS DE CREACION DE RATONES

const creaRaton = () => {
    const div = document.createElement(`div`)
    limpiaHoja(0, 3)
    div.innerHTML = `<form id="myForm" action="" class="myForm mt-3">
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
    div.innerHTML = `    <form id="myForm2" action="" class="myForm mt-3 gap-3">
    <div class="d-flex flex-row align-items-center gap-3">
        <div class="d-flex w-100 align-items-center gap-1">
            <label for="barcode">Barcode</label>
            <select class="form-select" aria-label="barcode" id="barcode2"></select>
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
        <button type="submit" class="btn btn-primary">Submit</button>
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
        const barcodeRaton = barcode2.value
        const dateRaton = fechaToArray(date.value)
        const genRaton = [genA.value, genAS.value, genB.value, genBS.value]
        const genderRaron = gender.value
        const parentsBefore = buscaJaula(barcodeRaton).parents.length
        buscaJaula(barcodeRaton).parents.push(new Raton(idRaton, `parent`, genRaton, dateRaton, genderRaron, `none`, barcodeRaton, `none`))
        idRaton++
        if (buscaJaula(barcodeRaton).parents.length === parentsBefore + 1) {
            toastify(`El raton parental se añadio a la jaula ${barcodeRaton}`, "linear-gradient(to right, #00b09b, #96c93d)")
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
    div.innerHTML = `    <form id="myForm2" action="" class="myForm mt-3 gap-3">
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
        <button id="bsubmit" type="submit" class="btn btn-primary mt-3 disabled">Submit</button>
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
        let pupsBefore = buscaJaula(barcodeRaton).pups.length
        for (i = 0; i < criasRaton; i++) {
            buscaJaula(barcodeRaton).pups.push(new Raton(idRaton, `pup`, gen, dateRaton, genderRaron, asignEarCode(i), barcodeRaton,))
            buscaJaula(barcodeRaton).pups[i].previousBarcode.push(barcodePadresRaton)
            idRaton++
        }
        if (buscaJaula(barcodeRaton).pups.length > pupsBefore) {
            criasRaton > 1 ? toastify(`${criasRaton} pups se añadieron a la jaula ${barcodeRaton}`, "linear-gradient(to right, #00b09b, #96c93d)") : toastify(`${criasRaton} pup se añadio a la jaula ${barcodeRaton}`, "linear-gradient(to right, #00b09b, #96c93d)")
        } else {
            toastify("No se pudo crear la jaula, revisa los datos.", "")
        }
        limpiaHoja(0, 3)
    })
}

// FORMULARIOS DE BUSQUEDA

const creaFormularioBusqueda = () => {
    limpiaHoja(0, 1, 2)
    const div = document.createElement('div')
    div.innerHTML = `<ul class="d-flex justify-content-around form__ul">
    <li><a id="selectJaula" class="selectJaula" href="javascript:void(0)">Jaula</a></li>
    <li><a id="selectRaton" href="javascript:void(0)">Raton</a></li>
</ul>`
    formSelect.append(div)
    selectJaula = document.querySelector(`#selectJaula`);
    selectRaton = document.querySelector(`#selectRaton`);
    selectJaula.addEventListener(`click`, (e) => {
        searchJaula()
    })
    selectRaton.addEventListener(`click`, (e) => {
        searchRaton()
    })
}

const searchRaton = () => {
    const div = document.createElement(`div`)
    limpiaHoja(0, 3)
    div.innerHTML = `    <form id="myForm2" action="" class="myForm mt-3 gap-3">
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
        <button id="bsubmit" type="submit" class="btn btn-primary mt-3 disabled">Submit</button>
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
    <form id="myForm2" action="" class="myForm mt-3 gap-3">
        <div class="d-flex flex-row gap-3">
            <div class="d-flex w-100">
                    <input type="number" class="form-control barcodeToBeScanned" placeholder="Barcode" id="data">
                    <a class="camIcon" id="camButton"><i class="fa fa-camera fa-xl" aria-hidden="true"></i></a>
                </div>
            </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
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
    div.innerHTML = `    <form id="myForm2" action="" class="myForm mt-3 gap-3">
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
    <form id="myForm" action="" class="myForm mt-3 gap-3">
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
        jaulas.forEach(element => {
            if (element.tipo === tipoJulaABuscar && element.barcode === barcodeABuscar) {
                jaulasAMostrar.push(element)
            } else if (tipoJulaABuscar === `` && element.barcode === barcodeABuscar) {
                jaulasAMostrar.push(element)
            } else if (element.tipo === tipoJulaABuscar && barcodeABuscar === ``) {
                jaulasAMostrar.push(element)
            } else if (tipoJulaABuscar === `todos`) {
                jaulasAMostrar.push(element)
            }
        })
        muestraJaulas(jaulasAMostrar)
    })
}

// FORMULARIOS PARA EL MOVIMIENTO DE RATONES

const creaFormularioMoverRaton = () => {
    const div = document.createElement(`div`)
    limpiaHoja(0, 1, 2, 3)
    div.innerHTML = `
    <form id="myForm" action="" class="myForm mt-3 gap-3">
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
        orejaRaton.innerHTML = ``
        creOptVacias(``, `#orejaRaton`, esJaulaAnterior.value)
    })
    addFromCamera()
    formValidation(`#esJaulaAnterior`, `mover`)
    myForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        let jaulaAnteriorValue = esJaulaAnterior.value
        let buscaOrejaRaton = orejaRaton.value
        let jaulaNuevaValue = nuevaJaula.value
        let pupsBefore = buscaJaula(jaulaAnteriorValue).pups.length
        let parentsBefore = buscaJaula(jaulaNuevaValue).parents.length
        mueveRaton(jaulaAnteriorValue, buscaOrejaRaton, jaulaNuevaValue)
        mainContainer.innerHTML = ''
        if (buscaJaula(jaulaAnteriorValue).pups.length  === pupsBefore - 1 && buscaJaula(jaulaNuevaValue).parents.length === parentsBefore + 1) {
            toastify(`El rato con codigo ${buscaOrejaRaton} se movio como padre a la jaula parental ${jaulaNuevaValue}`, "linear-gradient(to right, #00b09b, #96c93d)") 
        } else {
            toastify(` asdasd `, "linear-gradient(to right, #00b09b, #96c93d)")
        }
    })

}

