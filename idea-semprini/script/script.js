let jaulas = JSON.parse(localStorage.getItem(`jaulas`)) || []

let idRaton = 40
let idJaula = 40
let selectJaula = document.querySelector(`#selectJaula`)
let selectRaton = document.querySelector(`#selectRaton`)
let selectParental = document.querySelector(`#selectParental`)
let selectNoParental = document.querySelector(`#selectNoParental`)
let tipoRatonValue = ``

// CONSTRUCTORES //
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

// FUNCIONES BASICAS //

const limpiaHoja = (...options) => {
    options.forEach(e => {
        switch (e) {
            case 0:
                mainContainer.innerHTML = ''
                break
            case 1:
                formSelect.innerHTML = ''
                break
            case 2:
                formSelect2.innerHTML = ''
                break
            case 3:
                formSelect3.innerHTML = ''
                break
        }
    })
}


const toastify = (text, color) => {
    Toastify({
        text: text,
        duration: 4000,
        newWindow: true,
        close: false,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
            background: color,
        },
        // onClick: function(){} // Callback after click
    }).showToast();
}

const fechaToArray = (fecha) => {
    const year = Number(fecha.substr(0, 4))
    const month = Number(fecha.substr(5, 2))
    const day = Number(fecha.substr(8, 2))
    array = [year, month, day]
    return array
}

// FUNCIONES DE BUSQUEDA y FILTROS //

const buscaJaula = (barcode) => {
    return jaulas.find(e => e.barcode === barcode)
}

const busquedaR = (jaula, dato, datoABusacar, aFiltrarR) => {
    jaulas.filter(e => {
        let encontrados = e[jaula].filter(e => e[datoABusacar] == dato)
        encontrados.length > 0 && aFiltrarR.push(encontrados)
    })
}

const buscaJaulasVacias = (tipo) => {
    let tipoJaula = tipo === `parental` ? `parents` : `pups`
    jaulasVacias = jaulas.filter(e => e.tipo === tipo)
    jaulasVacias = jaulasVacias.filter(e => e[tipoJaula].length < 2)
    return jaulasVacias
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

// FUNCIONES LOGICAS DE ASIGNACIONES 

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

const asignGen = () => {
    let toCheck = buscaJaula(barcodeCheck.value)
    let toDisable = document.querySelectorAll(`.toDisable`)
    console.log(toCheck.parents.length)
    if (toCheck.parents.length !== 0) {
        let genAF = document.querySelector('#genA')
        let genBF = document.querySelector('#genB')
        genAF.value = toCheck.parents[0].gen[0]
        genBF.value = toCheck.parents[0].gen[2]
        toDisable.forEach(element => {
            element.setAttribute(`disabled`, "")
        });
    } else {
        toDisable.forEach(element => {
            element.removeAttribute(`disabled`, "")
        });
    }
}

const creOptVacias = (tipo, id, barcode) => {
    let aMostrar = tipo === `` ? buscaJaula(barcode).pups : buscaJaulasVacias(tipo)
    let sel = document.querySelector(id)
    let fragment = document.createDocumentFragment()
    if (sel.length < 1) {
        aMostrar.forEach(element => {
            let opt = document.createElement(`option`)
            opt.innerHTML = tipo === `` ? element.earCode : element.barcode
            opt.value = tipo === `` ? element.earCode : element.barcode
            fragment.appendChild(opt)
        })
    }
    sel.appendChild(fragment)
}

// FUNCION PARA MOVER RATONES DE JAULA

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

/////////////////////////////////////////////////////////////////

title.addEventListener(`click`, limpiaHoja(0, 1, 2, 3))
ingresaDatos.addEventListener(`click`, creaFormularioIngreso)
visualizaDatos.addEventListener(`click`, creaFormularioBusqueda)
moverRaton.addEventListener(`click`, creaFormularioMoverRaton)


