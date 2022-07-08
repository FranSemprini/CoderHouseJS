// let jaulas = JSON.parse(localStorage.getItem(`jaulas`)) || []

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
        this.parents = [false]
        this.pups = [false]
    }
}
class Raton {
    constructor(idRaton, tipo, gen, birth, gender, earCode, actualBarcode) {
        this.idRaton = idRaton
        this.tipo = tipo
        this.birth = birth
        this.gen = gen
        this.gender = gender
        this.earCode = earCode
        this.actualBarcode = Number(actualBarcode)
        this.previousBarcode = [false]
    }
}

// FUNCIONES BASICAS //

const limpiar = () => {
    limpiaHoja(0, 1, 2, 3)
    cerrarCamara()
}

const limpiaHoja = (...options) => {
    html5QrcodeScanner.clear();
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
                    for (let i = 0; i < element.gen.length; i++) {
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

// FUNCIONES LOGICAS DE ASIGNACION Y DE COMPROBACION 

const clearFalse = (jaula, e) => {
        buscaJaula(jaula)[e][0] === false && buscaJaula(jaula)[e].splice(0,1)
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
            if (toCheck) {
                if (toCheck.parents[0] !== false) {
                    let genAF = document.querySelector('#genA')
                    let genBF = document.querySelector('#genB')
                    let gender = document.querySelector(`#gender`)
                    genAF.value = toCheck.parents[0].gen[0]
                    genBF.value = toCheck.parents[0].gen[2]
                    toCheck.parents[0].gender === `male` ? gender.value = 'female': `male`
                    toDisable.forEach(element => {
                        element.setAttribute(`disabled`, "")
                    });
                } else {
                    toDisable.forEach(element => {
                        element.removeAttribute(`disabled`, "")
                    });
                }
            }

}

const creOptVacias = (tipo, id, barcode) => {
    let aMostrar = tipo === `` ? buscaJaula(barcode).pups : buscaJaulasVacias(tipo)
    let sel = document.querySelector(id)
    let fragment = document.createDocumentFragment()
    if (sel.length < 1 ) {
        aMostrar.forEach(element => {
            let opt = document.createElement(`option`)
            opt.innerHTML = tipo === `` ? element.earCode : element.barcode
            opt.value = tipo === `` ? element.earCode : element.barcode
            fragment.appendChild(opt)
        })
    }
    sel.appendChild(fragment)
}

const formValidation = (data, validacion) => {
    let sel = document.querySelector(data)
    let bsub = document.querySelector(`#bsubmit`)
    if (validacion === `jaula`) {
        sel.addEventListener(`change`, () => {
            let jaula = buscaJaula(sel.value)
            jaula === undefined ? bsub.classList.remove(`disabled`) : bsub.classList.add(`disabled`)
        })
    }
    if (validacion === `noparental`) {
        let aValidar = document.querySelectorAll(`.aValidar`)
        aValidar.forEach(e => e.addEventListener(`change`, () => {
            let jaula = buscaJaula(sel.value)
            if (jaula) {
                jaula.parents.length === 2 && amount.value !== `` ? bsub.classList.remove(`disabled`) : bsub.classList.add(`disabled`)
            } else {
                bsub.classList.add(`disabled`)
            }
        }))
    }
    if (validacion === `mover`) {
        let aValidar = document.querySelectorAll(`.aValidar`)
        aValidar.forEach(e => e.addEventListener(`change`, () => {
            let jaula = buscaJaula(sel.value)
            if (jaula) {
                buscaJaula(sel.value).pups.length >= 1? bsub.classList.remove(`disabled`) : bsub.classList.add(`disabled`)
            } else {
                bsub.classList.add(`disabled`)
            }
        }))
    }
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
    }
}

// CAMARA Y QRS

const addFromCamera = () => {
    const camButton = document.querySelector(`#camButton`)
    camButton.addEventListener(`click`, (e) => {
        const containerQr = document.querySelector(`.containeQr`)
        containerQr.classList.remove(`invisible`)
        containerQr.classList.add(`visible`)
        html5QrcodeScanner.render(onScanSuccess);
    })
    barcode = document.querySelector(`#barcode`)
}

const cerrarCamara = () => {
    html5QrcodeScanner.clear();
    const containerQr = document.querySelector(`.containeQr`)
    containerQr.classList.remove(`visible`)
    containerQr.classList.add(`invisible`)
}

// ////////////////////////////////


titulo.addEventListener(`click`, limpiar)
ingresaDatos.addEventListener(`click`, creaFormularioIngreso)
visualizaDatos.addEventListener(`click`, creaFormularioBusqueda)
moverRaton.addEventListener(`click`, creaFormularioMoverRaton)

