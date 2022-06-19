const jaulas = []
let idRaton = 1
let idJaula = 1
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
        this.actualBarcode = actualBarcode
        this.previousBarcode = previousBarcode
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

////////////////////////////////////////////////////////////////////////

const filtraJaulasTipo = (datoABusacar, dato) => {
    let filtrados = []
    if (datoABusacar === `tipo`) {
        filtrados = jaulas.filter(e => e.tipo === dato)
    }
    return filtrados
}

const filtraJaulasBarcode = (datoABusacar, dato) => {
    let filtrados = []
    if (datoABusacar === `barcode`) {
        filtrados = jaulas.filter(e => e.barcode === dato)
    }
    return filtrados
}

const muestraRatones = (datoABusacar, dato) => {
    mainContainer.innerHTML = ``
    filtrados = filtraRatones(datoABusacar, dato)
    filtrados.reverse().forEach(raton => {
        const div = document.createElement(`div`)
        div.innerHTML = ` <div id=card class="card blue__border">
        <h1 class="card__title">RATON - ${raton.tipo}</h1>
        <section id="cardRow" class="card__row light__grey">
        <p id="raton__previousBarcode">Barcode: ${raton.barcode}</p>
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
    });
};

////////////////////////////////////// //

const ingresaDatos = document.querySelector(`#ingresaDatos`)
const visualizaDatos = document.querySelector(`#visualizaDatos`)
const formSelect = document.querySelector(`#formSelect`)
const formSelect2 = document.querySelector(`#formSelect2`)
const formSelect3 = document.querySelector(`#formSelect3`)


const creaFormularioIngreso = () => {
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
        creaJaula()
    })
    selectRaton.addEventListener(`click`, (e) => {
        creaRaton()
    })
}

const creaJaula = () => {
    const div = document.createElement('div')
    formSelect2.innerHTML = ''
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
    mainContainer.innerHTML = ''
    formSelect.innerHTML = ''
    formSelect2.innerHTML = ''
    const div = document.createElement('div')
    div.innerHTML = `<ul class="d-flex justify-content-around form__ul">
    <li><a id="selectParental"  href="javascript:void(0)">Parent</a></li>
    <li><a id="selectNoParental" href="javascript:void(0)">Pups</a></li>
</ul>`
    formSelect2.append(div)
    selectParental = document.querySelector(`#selectParental`);
    selectNoParental = document.querySelector(`#selectNoParental`);
    selectParental.addEventListener(`click`, (e) => {
        creaParental()
    })
    selectNoParental.addEventListener(`click`, (e) => {
        creaNoParental()
    })
}

const creaParental = () => {
    const div = document.createElement(`div`)
    tipoRatonValue = ``
    mainContainer.innerHTML = '';
    div.innerHTML = `<form id="myForm" action="" class="myForm mt-3">
            <div class="d-flex flex-row">
                <input type="number" class="form-control mx-2" placeholder="Barcode" id="barcode">
                <select class="form-select mx-2" aria-label="" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div class="mt-3 d-flex flex-row">
                <label for="genA">Gen 1</label>
                <select class="form-select mx-2" aria-label="" id="genA">
                    <option value="genA1">1</option>
                    <option value="genA2">2</option>
                    <option value="genA3">3</option>
                </select>
                <select class="form-select mx-2" aria-label="" id="genAS">
                    <option value="genAS1">+</option>
                    <option value="genAS2">-</option>
                </select>
            </div>
            <div class="mt-3 d-flex flex-row">
                <label for="genB">Gen 2</label>
                <select class="form-select mx-2" aria-label="" id="genB">
                    <option value="genB1">1</option>
                    <option value="genB2">2</option>
                    <option value="genB3">3</option>
                </select>
                <select class="form-select mx-2" aria-label="" id="genBS">
                    <option value="genBS1">+</option>
                    <option value="genBS2">-</option>
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
    myForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        var barcodeRaton = barcode.value
        var dateRaton = fechaToArray(date.value)
        var genRaton = [[genA.value, genAS.value], [genB.value, genBS.value]]
        var genderRaron = gender.value
        buscaJaula(barcodeRaton).parents.push(new Raton(idRaton, `parental`, genRaton, dateRaton, genderRaron, `none`, barcodeRaton, `none`))
        idRaton++
        mainContainer.innerHTML = '';
    })
}

const creaNoParental = () => {
    const div = document.createElement(`div`)
    tipoRatonValue = ``
    mainContainer.innerHTML = '';
    div.innerHTML = `<form id="myForm" action="" class="myForm mt-3">
    <div class="d-flex flex-row">
        <input type="number" class="form-control mx-2" placeholder="Barcode" id="barcode">
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
    myForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        var barcodeRaton = barcode.value
        var barcodePadresRaton = barcodePadres.value
        var dateRaton = date.value
        var genderRaron = gender.value
        var criasRaton = amount.value
        for (i = 0; i < criasRaton; i++) {
            buscaJaula(barcodeRaton).pups.push(new Raton(idRaton, `pup`, `missing`, dateRaton, genderRaron, asignEarCode(i), barcodeRaton, barcodePadresRaton))
            buscaJaula(barcodePadresRaton).pups.push(new Raton(idRaton, `pup`, `missing`, dateRaton, genderRaron, asignEarCode(i), barcodeRaton, `none`))
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
        console.log(jaulasAMostrar)
        muestraJaulas(jaulasAMostrar)
    })
}


ingresaDatos.addEventListener(`click`, creaFormularioIngreso)
visualizaDatos.addEventListener(`click`, creaFormularioBusqueda)



