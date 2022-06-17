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
    array = [month, day, year]
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


const creaRaton = (barcode, previousBarcode) => {
    let fecha = ingresaFecha()
    let genA = prompt(`Ingresa el Gen A`)
    let genB = prompt(`Ingresa el Gen B`)
    let genero = prompt(`Genero?`)
    let crias = 0
    if (buscaJaula(barcode).tipo === `noparental`) {
        this.tipo = `Pup`
        do { crias = Number(prompt(`Cuantas crias? (maximo 5)`)) }
        while (crias > 5)
    } else if (buscaJaula(barcode).tipo === `noparental`) {
        for (let i = 0; i < crias; i++) {
            buscaJaula(barcode).pups.push(new Raton(idRaton, fecha, genA, genB, genero, asignEarCode(i), barcode, previousBarcode))
            buscaJaula(previousBarcode).pups.push(new Raton(idRaton, fecha, genA, genB, genero, asignEarCode(i), barcode, `none`))
            idRaton++
        }
    }
}

const filtraJaulas = (tipo) => {
    let filtrados = jaulas.filter(jaula => jaula.tipo === tipo)
    return filtrados
}
const parentales = filtraJaulas(`parental`)
const noParentales = filtraJaulas(`noparental`)


const filtraRatones = (datoABusacar, dato) => {
    let filtrados = []
    switch (datoABusacar) {
        case `tipo`:
            if (dato === `parents`) {
                let jaulaABuscar = filtraJaulas(`parental`)
                for (let i = 0; i < jaulaABuscar.length; i++) {
                    jaulaABuscar[i].parents.forEach(element => {
                        filtrados.push(element)
                    })
                }
            } else if (dato === `pups`) {
                let jaulaABuscar = filtraJaulas(`noparental`)
                for (let i = 0; i < jaulaABuscar.length; i++) {
                    jaulaABuscar[i].pups.forEach(element => {
                        filtrados.push(element)
                    })
                }
            }
            break;
        case `todo`:
            let jaulaABuscar = filtraJaulas(`parental`)
            for (let i = 0; i < jaulaABuscar.length; i++) {
                jaulaABuscar[i].parents.forEach(element => {
                    filtrados.push(element)
                })
            }
            jaulaABuscar = filtraJaulas(`noparental`)
            for (let i = 0; i < jaulaABuscar.length; i++) {
                jaulaABuscar[i].pups.forEach(element => {
                    filtrados.push(element)
                })
            }
            break;
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

const muestraJaulas = (tipo) => {
    mainContainer.innerHTML = ''
    let filtrados = []
    if (tipo === `parental` || tipo === `noparental`) {
        filtrados = filtraJaulas(tipo)
    } else if (tipo === `todos`) {
        filtrados = jaulas
    }
    filtrados.reverse().forEach(jaula => {
        let tipo = ``
        if (jaula.tipo === `parental`) {
            tipo = `Parental`
        } else if (jaula.tipo === `noparental`) {
            tipo = `No Parental`
        }
        const div = document.createElement('div')
        div.innerHTML = ` <div id=card class="card blue__border">
    <h1 class="card__title">JAULA</h1>
    <section id="cardRow" class="card__row light__grey">
    <p id="jaula__barcode">Barcode: ${jaula.barcode}</p>
    <p id="jaula__cageName">Cage Name: ${jaula.cageName}</p>
    </section>
    <section id="cardRow" class="card__row">
    <p id="jaula__tipo">Tipo: ${tipo}</p>
    <p id="jaula__fecha">Fecha: ${jaula.date}</p>
    </section>
    <section id="cardRow" class="card__row light__grey">
    <p id="jaula__parents">Parents: ${jaula.parents.length}</p>
    <p id="jaula__">Pups: ${jaula.pups.length}</p>
    </section></div>
    `
        mainContainer.append(div)
    })
};

////////////////////////////////////// //

const ingresaDatos = document.querySelector(`#ingresaDatos`)
const visualizaDatos = document.querySelector(`#visualizaDatos`)
const formSelect = document.querySelector(`#formSelect`)


const creaFormularioIngreso = () => {
    formSelect.innerHTML = ''
    const div = document.createElement('div')
    div.innerHTML = `<ul class="d-flex justify-content-around form__ul">
    <li><a id="selectJaula" class="selectJaula" href="javascript:void(0)">Jaula</a></li>
    <li><a id="selectRaton" href="javascript:void(0)">Raton</a></li>
</ul>`
    formSelect.append(div)
    selectJaula = document.querySelector(`#selectJaula`);
    selectRaton = document.querySelector(`#selectRaton`);
    selectJaula.addEventListener(`click`, (e) => {
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
    })

    selectRaton.addEventListener(`click`, () => {
        tipoRatonValue = ``
        mainContainer.innerHTML = '';
        div.innerHTML = `
            <div class="d-flex flex-row justify-content-center m-3">
            <button type="button" class="btn btn-secondary mx-2" id="botonParental">Parental</button>
            <button type="button" class="btn btn-secondary mx-2" id="botonNoParental">No Parental</button>
            </div>
        `
        mainContainer.append(div)
        botonParental = document.querySelector(`#botonParental`)
        botonParental.addEventListener(`click`, () => {
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
        })
        botonParental = document.querySelector(`#botonNoParental`)
        botonParental.addEventListener(`click`, () => {
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
        })
    });
}

ingresaDatos.addEventListener(`click`, creaFormularioIngreso)

