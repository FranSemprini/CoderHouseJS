let jaulas = JSON.parse(localStorage.getItem(`jaulas`)) || []

let idRaton = 40
let idJaula = 40
let selectJaula = document.querySelector(`#selectJaula`)
let selectRaton = document.querySelector(`#selectRaton`)
let selectParental = document.querySelector(`#selectParental`)
let selectNoParental = document.querySelector(`#selectNoParental`)
let tipoRatonValue = ``
class Jaula {
    constructor(idJaula, tipo, date, barcode, cageName,) {
        this.idJaula = idJaula
        this.tipo = tipo
        this.date = date
        this.barcode = barcode
        this.cageName = cageName
        this.parents = []
        this.pups = []
    }
}
class Raton {
    constructor(idRaton, tipo, gen, birth, gender, earCode, actualBarcode, previousBarcode) {
        this.idRaton = idRaton
        this.tipo = tipo
        this.birth = birth
        this.gen = gen
        this.gender = gender
        this.earCode = earCode
        this.actualBarcode = Number(actualBarcode)
        this.previousBarcode = []
    }
}

const fechaToArray = (fecha) => {
    const year = Number(fecha.substr(0, 4))
    const month = Number(fecha.substr(5, 2))
    const day = Number(fecha.substr(8, 2))
    array = [year, month, day]
    return array
}

const buscaJaula = (barcode) => {
    return jaulas.find(e => e.barcode === barcode)
}

const asignEarCode = (element) => {
    switch (element) {
        case 0:
            return `1R`
        case 1:
            return `2R`
        case 2:
            return `1L`
        case 3:
            return `2L`
        case 4:
            return `1R1L`
        default:
            break;
    }
}

//////////////////////////////////////////

const busquedaR = (jaula, dato, datoABusacar, aFiltrarR) => {
    jaulas.filter(e => {
        let encontrados = e[jaula].filter(e => e[datoABusacar] == dato)
        encontrados.length > 0 && aFiltrarR.push(encontrados)
    })
}

const filtaRatones = (datoABusacar, dato, tipo) => {
    if (datoABusacar === `id`) {
        let aFiltrarR = []
        let filtrados = ``
        busquedaR(`parents`, dato, `idRaton`, aFiltrarR)
        busquedaR(`pups`, dato, `idRaton`, aFiltrarR)
        filtrados = aFiltrarR[0][0]
        return filtrados
    } else if (datoABusacar === `barcode`) {
        let filtrados = []
        let aFiltrarR = []
        busquedaR(`parents`, dato, `actualBarcode`, aFiltrarR)
        busquedaR(`pups`, dato, `actualBarcode`, aFiltrarR)
        filtrados = aFiltrarR[0]
        return filtrados
    } else if (datoABusacar === `previousBarcode`) {
        let filtrados = []
        for (let i = 0; i < jaulas.length; i++) {
            jaulas[i].parents.forEach(element => {
                element.previousBarcode.forEach(element2 => {
                    if (dato === element2) {
                        filtrados.push(element)
                    }
                });
            })
            jaulas[i].pups.forEach(element => {
                element.previousBarcode.forEach(element2 => {
                    if (dato === element2) {
                        filtrados.push(element)
                    }
                });
            })
        }
        return filtrados
    } else if (datoABusacar === `gen`) {
        let filtrados = []
        let aFiltrarR = []
        tipo = tipo
        const filtraGenes = (tipo) => {
            for (let i = 0; i < jaulas.length; i++) {
                jaulas[i][tipo].forEach(element => {
                    coincidencias = 0
                    let validaCantidad = []
                    for (var i = 0; i < element.gen.length; i++) {
                        if (dato[i] === element.gen[i] || dato[i] === `any`) {
                            validaCantidad.push(dato[i])
                            coincidencias++
                        }
                    }
                    let ratonAFiltrar = element.idRaton
                    if (validaCantidad.length === 4) {
                        aFiltrarR.push({ id: ratonAFiltrar, coincidencias: coincidencias })
                    }
                })
            }
        }
        filtraGenes(tipo)
        aFiltrarR.forEach(element => {
            aFiltrarR.push(filtaRatones(`id`, element.id))
        });

        filtrados = aFiltrarR.filter(e => e.gender != undefined)
        return filtrados
    }
}

const mueveRaton = (buscaJaulaAnterior, buscaOrejaRaton, buscaNuevaJaula) => {
    let ratonABuscar = ``
    jaulaAnterior = buscaJaula(buscaJaulaAnterior)
    proximaJaula = buscaJaula(buscaNuevaJaula)
    jaulaAnterior.pups.forEach(element => {
        if (element.earCode == buscaOrejaRaton) {
            ratonABuscar = element
        }
    });
    if (proximaJaula.tipo === `parental` && jaulaAnterior.tipo === `noparental` && ratonABuscar !== ``) {
        ratonABuscar.previousBarcode.push(buscaJaulaAnterior)
        ratonABuscar.tipo = `parent`
        ratonABuscar.actualBarcode = Number(buscaNuevaJaula)
        buscaJaula(buscaNuevaJaula).parents.push(ratonABuscar)
        let ratonABorrar = jaulaAnterior.pups.indexOf(ratonABuscar)
        jaulaAnterior.pups.splice(ratonABorrar, 1)
    } else {
        console.log(`Las jaulas no son correctas`)
    }
}

const calculaGenes2 = (barcodePadresRaton) => {
    const padres = filtaRatones(`barcode`, barcodePadresRaton)
    let valorGenPP = 0
    let valorGenP1 = 0
    let valorGenp2 = 0

    let valorGen1 = padres[0].gen[0] === padres[1].gen[0] && padres[0].gen[0]
    let valorGen2 = padres[0].gen[2] === padres[1].gen[2] && padres[0].gen[2]

    if (padres[0].gen[1] === "+" && padres[1].gen[1] === "+") {
        valorGenPP = 0.75
    } else if (padres[0].gen[1] === "+" && padres[1].gen[1] === "-" || padres[0].gen[1] === "-" && padres[1].gen[1] === "+") {
        valorGenPP = 0.5
    }

    const daValorGen = (parent) => {
        if (padres[parent].gen[3] === `++`) {
            if (parent === 0) {
                valorGenP1 = 1
            } else if (parent === 1) {
                valorGenp2 = 1
            }
        } else if (padres[parent].gen[3] === `+-`) {
            if (parent === 0) {
                valorGenP1 = 0.5
            } else if (parent === 1) {
                valorGenp2 = 0.5
            }
        }
    }
    daValorGen(0, valorGenP1)
    daValorGen(1, valorGenp2)
    const porCien = (numero) => {
        return numero * 100
    }

    // probabilidad ++
    resultado1 = valorGenP1 * valorGenp2
    // posibilidad de --
    resultado2 = (1 - valorGenP1) * (1 - valorGenp2)
    // posibilidad +-
    resultado3 = 1 - resultado1 - resultado2
    genArmado = [valorGen1, `+:${porCien(valorGenPP)}%`, valorGen2, `++:${porCien(resultado1)}% / --:${porCien(resultado2)}% / +-:${porCien(resultado3)}%`]
    return genArmado
}

const buscaJaulasVacias = (tipo) => {
    let tipoJaula = tipo === `parental` ? `parents` : `pups`
    jaulasVacias = jaulas.filter(e => e.tipo === tipo)
    jaulasVacias = jaulasVacias.filter(e => e[tipoJaula].length < 2)
    return jaulasVacias
}

const creOptVacias = (tipo, id, barcode) => {
    let aMostrar = tipo === `` ? buscaJaula(barcode).pups : buscaJaulasVacias(tipo)
    let sel = document.querySelector(id)
    let fragment = document.createDocumentFragment()
    if (sel.length < 1) {
        aMostrar.forEach(element => {
            let opt = document.createElement(`option`)
            opt.innerHTML = tipo === `` ?  element.earCode : element.barcode
            opt.value = tipo === `` ? element.earCode : element.barcode
            fragment.appendChild(opt)
        })
    }
    sel.appendChild(fragment)
}

////////////////////////////////////////////////////////////////////////

const muestraRatones = (datoABusacar, dato, tipo) => {
    mainContainer.innerHTML = ``
    filtrados = filtaRatones(datoABusacar, dato, tipo)
    filtrados.reverse().forEach(raton => {
        const div = document.createElement(`div`)
        div.innerHTML = ` <div id=card class="card blue__border">
        <h1 class="card__title">RATON - ${raton.tipo.toUpperCase()}</h1>
        <section id="cardRow" class="card__row light__grey">
        <p id="raton__previousBarcode">Barcode: ${raton.actualBarcode}</p>
        <p id="raton__previousBarcode">Previous Barcode: ${raton.previousBarcode}</p>
        </section>
        <section id="cardRow" class="card__row">
        <p id="raton__bitrth">Birth: ${raton.birth}</p>
        <p id="raton__earCode">Earcode: ${raton.earCode}</p>
        </section>
        <section id="cardRow" class="card__row light__grey">
        <p id="raton__gen">Gen: ${raton.gen}</p>
        <p id="raton__gender">Gender: ${raton.gender}</p>
        </section></div>
        `
        mainContainer.append(div)
    })
}

const muestraJaulas = (element) => {
    mainContainer.innerHTML = ''
    element.forEach(jaula => {
        const div = document.createElement('div')
        div.innerHTML = ` <div id=card class="card blue__border">
    <h1 class="card__title">JAULA</h1>
    <section id="cardRow" class="card__row light__grey">
    <p id="jaula__barcode">Barcode: ${jaula.barcode}</p>
    <p id="jaula__cageName">Cage Name: ${jaula.cageName}</p>
    </section>
    <section id="cardRow" class="card__row">
    <p id="jaula__tipo">Tipo: ${jaula.tipo}</p>
    <p id="jaula__fecha">Fecha: ${jaula.date}</p>
    </section>
    <section id="cardRow" class="card__row light__grey">
    <p id="jaula__parents">Parents: ${jaula.parents.length}</p>
    <p id="jaula__">Pups: ${jaula.pups.length}</p>
    </section></div>
    `
        mainContainer.append(div)
        div.addEventListener(`click`, () => {
            muestraRatones(`barcode`, jaula.barcode)

        })
    });
};

////////////////////////////////////// //

const ingresaDatos = document.querySelector(`#ingresaDatos`)
const visualizaDatos = document.querySelector(`#visualizaDatos`)
const moverRaton = document.querySelector(`#moverRaton`)
const title = document.querySelector(`#title`)
const formSelect = document.querySelector(`#formSelect`)
const formSelect2 = document.querySelector(`#formSelect2`)
const formSelect3 = document.querySelector(`#formSelect3`)

const limpiaHoja = () => {
    mainContainer.innerHTML = ''
    formSelect.innerHTML = ''
    formSelect2.innerHTML = ''
    formSelect3.innerHTML = ''
}

const creaFormularioIngreso = () => {
    mainContainer.innerHTML = ''
    formSelect.innerHTML = ''
    formSelect2.innerHTML = ''
    formSelect3.innerHTML = ''
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

const creaJaula = () => {
    const div = document.createElement('div')
    formSelect2.innerHTML = ''
    formSelect3.innerHTML = ''
    mainContainer.innerHTML = '';
    div.innerHTML = `<form id="myForm" action="" class="myForm mt-3">
            <div>
            <select class="form-select" aria-label="" id="tipo">
                <option value="parental">Parents</option>
                <option value="noparental">Pups</option>
          </select>
    
            </div>
            <div class="mt-3">
                <input type="number" class="form-control" placeholder="Barcode" id="barcode">
            </div>
            <div class="mt-3">
                <input type="text" id="nombre" class="form-control" placeholder="Name">
            </div>
            <div class="mt-3">
                <label for="date">Date</label>
                <input id="date" class="form-control" type="date" />
            </div>
            <div>
                <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </div>
        </form>`
    mainContainer.append(div)
    myForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        var tipoJula = tipo.value
        var dateJaula = fechaToArray(date.value)
        var nombreJaula = nombre.value
        var barcodeJaula = barcode.value
        jaulas.push(new Jaula(idJaula, tipoJula, dateJaula, barcodeJaula, nombreJaula))
        mainContainer.innerHTML = '';
        idJaula++
    })
}

const creaRaton = () => {
    const div = document.createElement(`div`)
    formSelect3.innerHTML = ''
    mainContainer.innerHTML = ''
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
    mainContainer.innerHTML = '';
    div.innerHTML = `<form id="myForm2" action="" class="myForm mt-3">
            <div class="d-flex flex-row align-items-center">
            <label for="barcode">Barcode</label>
            <select class="form-select mx-2" aria-label="barcode" id="barcode"></select>
                <select class="form-select mx-2" aria-label="" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div class="mt-3 d-flex flex-row">
                <label for="genA">Gen 1</label>
                <select class="form-select mx-2" aria-label="" id="genA">
                    <option value="CAG-CRE">CAG-CRE</option>
                    <option value="COL1A1-CRE">COL1A1-CRE</option>
                    <option value="COL1A2-CRE">COL1A2-CRE</option>
                    <option value="ACTA2-CRE">ACTA2-CRE</option>
                    <option value="Nestin-CRE">Nestin-CRE</option>
                </select>
                <select class="form-select mx-2" aria-label="" id="genAS">
                    <option value="+">+</option>
                    <option value="-">-</option>
                </select>
            </div>
            <div class="mt-3 d-flex flex-row">
                <label for="genB">Gen 2</label>
                <select class="form-select mx-2" aria-label="" id="genB">
                    <option value="LAIR1 FLOXED">LAIR1 FLOXED</option>
                    <option value="COL1A1 FLOXED">COL1A1 FLOXED</option>
                    <option value="Tomato">Tomato</option>
                </select>
                <select class="form-select mx-2" aria-label="" id="genBS">
                    <option value="++">++</option>
                    <option value="+-">+-</option>
                    <option value="--">--</option>
                </select>
            </div>
            </div>
            <div class="mt-3">
                <label for="date">Date</label>
                <input id="date" class="form-control" type="date" />
            </div>
            <div>
                <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </div>
        </form>`
    mainContainer.append(div)
    creOptVacias(`parental`, `#barcode`)
    myForm2.addEventListener(`submit`, (e) => {
        e.preventDefault();
        var barcodeRaton = barcode.value
        var dateRaton = fechaToArray(date.value)
        var genRaton = [genA.value, genAS.value, genB.value, genBS.value]
        var genderRaron = gender.value
        buscaJaula(barcodeRaton).parents.push(new Raton(idRaton, `parent`, genRaton, dateRaton, genderRaron, `none`, barcodeRaton, `none`))
        idRaton++
        mainContainer.innerHTML = '';
        formSelect3.innerHTML = '';
    })
}

const creaNoParental = () => {
    const div = document.createElement(`div`)
    tipoRatonValue = ``
    mainContainer.innerHTML = '';
    div.innerHTML = `<form id="myForm2" action="" class="myForm mt-3">
    <div class="d-flex flex-row align-items-center">
    <label for="barcode">Barcode</label>
    <select class="form-select mx-2" aria-label="barcode" id="barcode"></select>
    <select class="form-select mx-2" aria-label="" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
    </div>

    <div class="d-flex flex-row mt-3">
        <input type="number" class="form-control mx-2" placeholder="Barcode Padres" id="barcodePadres">
        <select class="form-select mx-2" aria-label="" id="amount">
            <option value="">Crias</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>
    <div class="mt-3">
        <label for="date">Date</label>
        <input id="date" class="form-control" type="date" />
    </div>
    <div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
    </div>
</form>`
    mainContainer.append(div)
    creOptVacias(`noparental`, `#barcode`)
    myForm2.addEventListener(`submit`, (e) => {
        e.preventDefault();
        var barcodeRaton = barcode.value
        var barcodePadresRaton = barcodePadres.value
        var dateRaton = fechaToArray(date.value)
        var genderRaron = gender.value
        var criasRaton = amount.value
        var gen = calculaGenes2(barcodePadresRaton)
        for (i = 0; i < criasRaton; i++) {
            buscaJaula(barcodeRaton).pups.push(new Raton(idRaton, `pup`, gen, dateRaton, genderRaron, asignEarCode(i), barcodeRaton,))
            buscaJaula(barcodeRaton).pups[i].previousBarcode.push(barcodePadresRaton)
            idRaton++
        }
        mainContainer.innerHTML = '';
    })
}

const creaFormularioBusqueda = () => {
    mainContainer.innerHTML = ''
    formSelect.innerHTML = ''
    formSelect2.innerHTML = ''
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
    formSelect3.innerHTML = ''
    mainContainer.innerHTML = ''
    div.innerHTML = `<form id="myForm" action="" class="myForm mt-3">
    <div class="d-flex flex-row align-items-center">
        <select class="form-select mx-2" aria-label="" id="aBuscar">
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
    mainContainer.innerHTML = ''
    div.innerHTML = `
            <form id="myForm2" action="" class="myForm mt-3">
            <div class="d-flex flex-row align-items-center">
                <input type="number" class="form-control mx-2" placeholder="Barcode" id="data">
            </div>
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>`
    mainContainer.append(div)
    myForm2.addEventListener(`submit`, (e) => {
        formSelect3.innerHTML = ''
        e.preventDefault();
        muestraRatones(`previousBarcode`, data.value)
    })
}

const buscaGenesRaton = () => {
    const div = document.createElement(`div`)
    mainContainer.innerHTML = ''
    div.innerHTML = `<form id="myForm2" action="" class="myForm mt-3">
    <div class="mt-3 d-flex flex-row">
    <select class="form-select mx-2" aria-label="" id="tipo">
        <option value="parents">Parent</option>
        <option value="pups">Pups</option>
    </select>
    </div>
    <div class="mt-3 d-flex flex-row">
    <label for="genA">Gen 1</label>
    <select class="form-select mx-2" aria-label="" id="genA">
    <option value="any">Any</option>
        <option value="CAG-CRE">CAG-CRE</option>
        <option value="COL1A1-CRE">COL1A1-CRE</option>
        <option value="COL1A2-CRE">COL1A2-CRE</option>
        <option value="ACTA2-CRE">ACTA2-CRE</option>
        <option value="Nestin-CRE">Nestin-CRE</option>
    </select>
    <select class="form-select mx-2" aria-label="" id="genAS">
    <option value="any">Any</option>
        <option value="+">+</option>
        <option value="-">-</option>
    </select>
</div>
<div class="mt-3 d-flex flex-row">
    <label for="genB">Gen 2</label>
    <select class="form-select mx-2" aria-label="" id="genB">
    <option value="any">Any</option>
        <option value="LAIR1 FLOXED">LAIR1 FLOXED</option>
        <option value="COL1A1 FLOXED">COL1A1 FLOXED</option>
        <option value="Tomato">Tomato</option>
    </select>
    <select class="form-select mx-2" aria-label="" id="genBS">
    <option value="any">Any</option>
        <option value="++">++</option>
        <option value="+-">+-</option>
        <option value="--">--</option>
    </select>
</div>
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>`
    mainContainer.append(div)
    myForm2.addEventListener(`submit`, (e) => {
        formSelect3.innerHTML = ''
        e.preventDefault();
        genAll = [genA.value, genAS.value, genB.value, genBS.value]
        muestraRatones(`gen`, genAll, tipo.value)
    })
}

const searchJaula = () => {
    const div = document.createElement(`div`)
    formSelect3.innerHTML = ''
    mainContainer.innerHTML = ''
    div.innerHTML = `
<form id="myForm" action="" class="myForm mt-3">
<div class="d-flex flex-row">
    <select class="form-select mx-2" aria-label="" id="tipo">
        <option value="">Valor a Buscar</option>
        <option value="parental">Parental</option>
        <option value="noparental">No Parental</option>
        <option value="todos">Todos</option>
    </select>
    <input type="number" class="form-control mx-2" placeholder="Barcode" id="barcode">
</div>
<button type="submit" class="btn btn-primary mt-3">Submit</button>
</form>`
    mainContainer.append(div);
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

const creaFormularioMoverRaton = () => {
    const div = document.createElement(`div`)
    formSelect2.innerHTML = ''
    formSelect3.innerHTML = ''
    mainContainer.innerHTML = ''
    div.innerHTML = `
<form id="myForm" action="" class="myForm mt-3">
<div class="d-flex flex-row">
<input type="number" class="form-control mx-2" placeholder="Jaula anterior" id="esJaulaAnterior">
<select class="form-select mx-2" aria-label="" id="orejaRaton"></select>
</div>
<div class="d-flex flex-row  mt-3">
<label for="nuevaJaula">Mover a Jaula:</label>
<select class="form-select mx-2" aria-label="nuevaJaula" id="nuevaJaula"></select>
</div>
<button type="submit" class="btn btn-primary mt-3">Submit</button>
</form>`
    mainContainer.append(div);
    creOptVacias(`parental`, `#nuevaJaula`)
    myForm.addEventListener(`change`, () => {
        creOptVacias(``, `#orejaRaton`, esJaulaAnterior.value)
    })
    myForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        let buscaJaulaAnterior = esJaulaAnterior.value
        let buscaOrejaRaton = orejaRaton.value
        let buscaNuevaJaula = nuevaJaula.value
        mueveRaton(buscaJaulaAnterior, buscaOrejaRaton, buscaNuevaJaula)
        mainContainer.innerHTML = ''
    })
}

ingresaDatos.addEventListener(`click`, creaFormularioIngreso)
visualizaDatos.addEventListener(`click`, creaFormularioBusqueda)
moverRaton.addEventListener(`click`, creaFormularioMoverRaton)
title.addEventListener(`click`, limpiaHoja)


