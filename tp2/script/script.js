let nombre
let edad
let bebidasElegidas = []

const preguntarNombre = () => {
    nombre = prompt(`Bienvenido! Cual es tu nombre?`).replace(/ /g, '')
    if (nombre.length >= 3) {
        return nombre
    } else {
        alert(`${nombre} no es un nombre correcto, por favor ingresa otro nombre.`)
        preguntarNombre()
    }
}

const validarEdad = (nombre) => {
    edad = Number(prompt(`Hola ${nombre}, cual es tu edad?`))
    if (isNaN(edad) || edad === 0) {
        alert(`Por favor ${nombre}, ingresa una edad correcta.`)
        return validarEdad(nombre)
    } else if (edad < 21) {
        alert(`Lo siento ${nombre} pero tenes que ser mayor de 21 para continuar y vos solo tenes ${edad}.`)
        return false
    } else {
        alert(`Bienvenido ${nombre}, con ${edad} años podes ingresar al cuestionario!`)
        return true
    }
}

const cuestionario = (nombre) => {
    const bebidas = ['Cerveza', `Whisky`, `Vino`, `Tekila`, `Ron`]
    for (let i = 0; i < bebidas.length; i++) {
        let queTomas = (prompt(`${nombre}, tomas ${bebidas[i]} ? - Si / No`).toLowerCase()).replace(/ /g, '')
        if (queTomas === `si`) {
            bebidasElegidas.push(bebidas[i])
        } else if (queTomas === `no`) {
            continue
        } else {
            alert(`Por favor ${nombre} ingresa una respuesta valida`)
            i -= 1
        }
    }
}

const salida = (nombre, bebidasElegidas) => {
    if (bebidasElegidas.length > 1) {
        alert(`Las ${bebidasElegidas.length} bebidas elegidas son: ${bebidasElegidas}. Gracias ${nombre} por completar el cuestionario`)
    } else if (bebidasElegidas.length === 1) {
        alert(`La unica bebida elegida es: ${bebidasElegidas}. Gracias ${nombre} por completar el cuestionario`)
    } else {
        alert(`No elegiste ninguna bebida. Gracias ${nombre} por completar el cuestionario`)
    }
}

const bebidasFavoritas = (nombre) => {
    if (validarEdad(nombre)) {
        cuestionario(nombre)
        salida(nombre, bebidasElegidas)
    }
}

preguntarNombre()
bebidasFavoritas(nombre)


