const jaulas = []


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
    constructor(birth, genA, genB, gender, previousBarcode) {
        this.birth = birth
        this.gen = [genA, genB]
        this.gender = gender
        this.previousBarcode = previousBarcode
    }

    addGen(a, b) {
        this.gen = [a, b]
    }
}

function buscaJaula(elemento) {
    let aBuscar = elemento
    return jaulas.findIndex((e) => aBuscar === e.barcode)
}

const ingresaCodigo = () => {
    let codigo = Number(prompt(`Ingresa el codigo`).replace(/ /g, ''))
    if (!isNaN(codigo) && codigo != "") {
        return codigo
    } else {
        alert(`No ingresaste un numero`)
        return ingresaCodigo()
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

const cuantosCrea = (barcode, posicionPadres, genero, crias, fecha, genA, genB, barcodePadres) => {

    if (jaulas[barcode].tipo === `parental`) {
        jaulas[barcode].parents.push(new Raton(fecha, genA, genB, genero))
    } else if (jaulas[barcode].tipo === `noparental`) {
        for (let i = 0; i < crias; i++) {
            jaulas[barcode].pups.push(new Raton(fecha, genA, genB, genero, barcodePadres))
            jaulas[posicionPadres].pups.push(new Raton(fecha, genA, genB, genero))
        }
    }
}
// ////////////////////////////////////////////////////////////////////////////////////////////////////

// crea una jaula, el valor es parental / noparental
const creaJaula = (tipoDeJaula) => {
    jaulas.push(new Jaula(tipoDeJaula, ingresaFecha(), ingresaCodigo(), prompt(`Nombre de la jaula`)))
}

// el codigo es la jaula a la que van, y el segundo es de donde vienen

const creaRaton = (barcode, barcodePadres) => {
    let fecha = ingresaFecha()
    let genA = prompt(`Ingresa el Gen A`)
    let genB = prompt(`Ingresa el Gen B`)
    let genero = prompt(`Genero?`)
    let crias
    index = buscaJaula(barcode)
    if (jaulas[index].tipo === `noparental`) {
        crias = Number(prompt(`Cuantas crias?`))
    }
    indexPadres = buscaJaula(barcodePadres)
    cuantosCrea(index, indexPadres, genero, crias, fecha, genA, genB, barcodePadres)
}