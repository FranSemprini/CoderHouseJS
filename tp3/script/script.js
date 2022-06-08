let nombre = ''

const admin = {
    user: `admin`,
    pass: `admin`
}

class Sagas {
    constructor(nombre, autor, anioPrimerLibro) {
        this.nombre = nombre
        this.autor = autor
        this.anioPrimerLibro = anioPrimerLibro
    }
    // aca van los metodos, no se me ocurre ninguno que pueda aplicar en este caso :(
}

const sagasFavoritas = [
    { nombre: `Cancion de Hielo y Fuego`, autor: `George R.R. Martin`, anioPrimerLibro: 1996 },
    { nombre: `La Fundacion`, autor: `Isaac Asimov`, anioPrimerLibro: 1951 },
    { nombre: `Dune`, autor: `Frank Herbert`, anioPrimerLibro: 1965, }
]

const validacionSagas = (nombre) => {
    input = prompt(`Cual es el ${nombre} de la saga a agregar?`)
    if (input.length !== 0) {
        return input
    } else {
        alert(`Ingresa un ${nombre} valido`)
        return validacionSagas(nombre)
    }
}

const validacionSagasAnio = (nombre) => {
    input = prompt(`Cual es el ${nombre} de la saga a agregar?`)
    if (Number(isNaN(input)) || input > 2022 || input < 0) {
        alert(`Ingresa un ${nombre} valido`)
        return validacionSagasAnio(nombre)
    } else {
        return input
    }
}

const muestraSagas = (nombre, sorted) => {
    for (sagas in sorted) {
        console.log(`${sorted[sagas].nombre} | ${sorted[sagas].autor} | ${sorted[sagas].anioPrimerLibro}`)
    }
    alert(`${nombre}, la lista se encuentra en consola.`)
}

const agregarSagas = (sagasFavoritas) => {
    let nombreSaga = validacionSagas(`nombre`)
    let autorSaga = validacionSagas(`autor`)
    let anioPrimerLibroSaga = validacionSagasAnio(`anio`)
    sagasFavoritas.push(new Sagas(nombreSaga, autorSaga, anioPrimerLibroSaga))
    alert(`El libro ${sagasFavoritas[sagasFavoritas.length - 1].nombre} del autor ${sagasFavoritas[sagasFavoritas.length - 1].autor} del año ${sagasFavoritas[sagasFavoritas.length - 1].anioPrimerLibro} se agrego correctamente.`)
    adminFn(nombre)
}

const eliminarSagas = (nombre, sagasFavoritas) => {
    muestraSagas(nombre, sagasFavoritas)
    let eliminar = Number(prompt(`Ingresa el numero de saga a eliminar (1,2,3,etc)`))
    if (isNaN(eliminar) || eliminar < 0 || eliminar > sagasFavoritas.length) {
        alert(`${nombre}, no ingresaste un numero correcto, volve a intentarlo.`)
        eliminarSagas(nombre, sagasFavoritas)
    } else {
        sagasFavoritas.splice(eliminar - 1, 1)
        muestraSagas(nombre, sagasFavoritas)
        adminFn(nombre)
    }
}

const ingreso = () => {
    nombre = (prompt('Hola! Cual es tu nombre?').toLowerCase()).replace(/ /g, '')
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1)
    if (nombre.length >= 3) {
        validacion(nombre)
    } else {
        alert(`"${nombre}" no es un nombre correcto, por favor ingresa un nombre valido.`)
        ingreso()
    }
}

const validacion = (nombre) => {
    let tipoUsusario = prompt(`Bienvenido ${nombre}, queres ingresar como usuario o administrador? "usuario" / "administrador".`).replace(/ /g, '')
    if (tipoUsusario.toLowerCase() === `usuario`) {
        alert(`${nombre}, como usuario podes ver mis sagas de libros favoritos, como queres ordenarlos?`)
        usuarioFn(nombre)
    } else if (tipoUsusario.toLowerCase() === `administrador`) {
        let user = prompt(`Ingresa tu usuario - Tip: admin`)
        let pass = prompt(`Ingresa tu pass - Tip: admin`)
        if (user === admin.user && pass === admin.pass) {
            alert(`${nombre}, como admin podes ver mis sagas de libros favoritos, asi como crear nuevos y eliminar datos ya ingresados.`)
            adminFn(nombre)
        } else {
            alert(`Los datos ingresados no son correctos. Vuelves a la seleccion de tipo de usuario`)
            validacion(nombre)
        }
    } else {
        alert(`"${tipoUsusario}" no es un tipo de usuario correcto, por favor elige una de las dos opciones validas.`)
        validacion(nombre)
    }
}

const usuarioFn = (nombre, usuario) => {
    let eleccion = prompt(`Ordenar alfabeticamente o por fehca de salida? "alfabeticamente" / "fecha"`).replace(/ /g, '')
    if (eleccion.toLowerCase() === `alfabeticamente`) {
        const sortArray = (a, b) => a.nombre.localeCompare(b.nombre)
        var sorted = sagasFavoritas.sort(sortArray)
        muestraSagas(nombre, sorted)
        if (usuario == `admin`) {
            adminFn(nombre)
        } else {
            usuarioFn(nombre)
        }
    } else if (eleccion.toLowerCase() === `fecha`) {
        const sortArray = (a, b) => (a.anioPrimerLibro).toString().localeCompare(b.anioPrimerLibro).toString()
        var sorted = sagasFavoritas.sort(sortArray)
        muestraSagas(nombre, sorted)
        if (usuario == `admin`) {
            adminFn(nombre)
        } else {
            usuarioFn(nombre)
        }
    } else {
        alert(`Por favor ingresa un valor correcto.`)
        usuarioFn(nombre)
    }
}

const adminFn = (nombre) => {
    let eleccion = prompt(`Que deseas hacer? "visualizar" / "agregar" / "eliminar"`).replace(/ /g, '')
    switch (eleccion.toLowerCase()) {
        case `visualizar`:
            usuarioFn(nombre, `admin`)
            adminFn(nombre)
            break;
        case `agregar`:
            agregarSagas(sagasFavoritas)
            break;
        case `eliminar`:
            eliminarSagas(nombre, sagasFavoritas)
            break;
        default:
            alert(`${nombre}, no seleccionaste una opcion correcta. Volve a intentarlo`)
            adminFn(nombre)
    }
}

ingreso()





