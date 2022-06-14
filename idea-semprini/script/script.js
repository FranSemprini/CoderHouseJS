const jaulas = []
let idRaton = 1

class Jaula {
    constructor(tipo, date, barcode, cageName,) {
        this.tipo = tipo
        this.date = date
        this.barcode = barcode
        this.cageName = cageName
        this.parents = []
        this.pups = []
    }
}

class Raton {
    constructor(idRaton, birth, genA, genB, gender, earCode, actualBarcode, previousBarcode) {
        this.idRaton = idRaton
        this.birth = birth
        this.gen = [genA, genB]
        this.gender = gender
        this.earCode = earCode
        this.actualBarcode = actualBarcode
        this.previousBarcode = previousBarcode
    }
}


const ingresaFecha = () => {
    const date = new Date()
    let fecha = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
    respuesta = (prompt(`Queres usar la fecha de hoy: ${fecha}? Si / No`)).toLowerCase()
    if (respuesta.toLowerCase() == `si`) {
        return fecha
    } else {
        fecha[0] = Number(prompt(`Ingresa el dia`).replace(/ /g, ''))
        fecha[1] = Number(prompt(`Ingresa el mes`).replace(/ /g, ''))
        fecha[2] = Number(prompt(`Ingresa el año`).replace(/ /g, ''))
        return fecha
    }
}

const ingresaCodigo = () => {
    let codigo = Number(prompt(`Ingresa el codigo`).replace(/ /g, ''))
    if (!isNaN(codigo) && codigo != "" && buscaJaula(codigo) === undefined) {
        return codigo
    } else {
        alert(`No ingresaste un numero o el codigo ya esta usado`)
        return ingresaCodigo()
    }
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

const creaJaula = (tipoDeJaula) => {
    let nobreDeJaula = ''
    jaulas.push(new Jaula(tipoDeJaula, ingresaFecha(), ingresaCodigo(), nobreDeJaula))
}

const creaRaton = (barcode, previousBarcode) => {
    let fecha = ingresaFecha()
    let genA = prompt(`Ingresa el Gen A`)
    let genB = prompt(`Ingresa el Gen B`)
    let genero = prompt(`Genero?`)
    let crias = 0
    if (buscaJaula(barcode).tipo === `noparental`) {
        do {crias = Number(prompt(`Cuantas crias? (maximo 5)`))}
        while(crias > 5)
    }
    if (buscaJaula(barcode).tipo === `parental`) {
        earCode = `none`
        buscaJaula(barcode).parents.push(new Raton(idRaton, fecha, genA, genB, genero, `none`, barcode, `none`))
        idRaton++
    } else if (buscaJaula(barcode).tipo === `noparental`) {
        for (let i = 0; i < crias; i++) {
            id = idRaton
            buscaJaula(barcode).pups.push(new Raton(idRaton, fecha, genA, genB, genero, asignEarCode(i), barcode, previousBarcode))
            buscaJaula(previousBarcode).pups.push(new Raton(idRaton, fecha, genA, genB, genero, asignEarCode(i), barcode, `none`))
            idRaton++
        }
    }
}

const filtraJaulas = (tipo) => {
    let filtrados = jaulas.filter(jaula => jaula.tipo === tipo)
    console.log(filtrados)
}

const filtraRatones = (tipoJaula) => {
    filtrados = []
    if (tipoJaula === `padres`) {
        for (let i = 0; i < jaulas.length; i++) {
            jaulas[i].parents.forEach(element => {
                filtrados.push(element)
            })
        }
    } else if (tipoJaula === `pups`) {
        for (let i = 0; i < jaulas.length; i++) {
            if (jaulas[i].tipo === `noparental`) {
                jaulas[i].pups.forEach(element => {
                    filtrados.push(element)
                })
            }

        }
    }
    console.log(filtrados)
}
