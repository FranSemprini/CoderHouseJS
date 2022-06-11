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
    constructor(birth, genA, genB, gender, previousBarcode) {
        this.id = idRaton
        this.birth = birth
        this.gen = [genA, genB]
        this.gender = gender
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
    if (!isNaN(codigo) && codigo != "") {
        return codigo
    } else {
        alert(`No ingresaste un numero`)
        return ingresaCodigo()
    }
}

const buscaJaula = (barcode) => {
    return jaulas.find(e => e.barcode === barcode)
}

    ////////////////////////////////////////////////////////////////////////

const creaRatonCrias = (id, barcode, previousBarcode, genero, crias, fecha, genA, genB) =>{
    if (buscaJaula(barcode).tipo === `parental`) {
        buscaJaula(barcode).push(new Raton(id, fecha, genA, genB,genero))
    }
}

const creaJaula = (tipoDeJaula) => {
    let nobreDeJaula = ''
    jaulas.push(new Jaula(tipoDeJaula, ingresaFecha(), ingresaCodigo(), nobreDeJaula))
    idRaton ++
}

const creaRaton = (barcode, previousBarcode) => {
    let fecha = ingresaFecha()
    let genA = prompt(`Ingresa el Gen A`)
    let genB = prompt(`Ingresa el Gen B`)
    let genero = prompt(`Genero?`)
    let crias = 0
    let id = idRaton
    indexPadres = buscaJaula(previousBarcode)
    if (buscaJaula(barcode).tipo === `noparental`) {
        crias = Number(prompt(`Cuantas crias?`))
    }
    
}