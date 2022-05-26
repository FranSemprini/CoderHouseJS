
const validacion = prompt(`Sos Enzo? Si/No`).toLowerCase()

if (validacion === `si`) {
    let numero = Number(prompt(`Ingresa el numero para calcular su tabla`))
    do {
        if (isNaN(numero)) {
            alert(`No ingresaste un numero`)
        } else {
            alert(`La tabla del ${numero} esta en consola`)
            for (let i = 0; i <= 10; i++) {
                console.log(`${numero} * ${i} es`, numero * i)
            }
        }
        numero = prompt(`Para una nueva operacion ingresa el numero, para salir ingresa "ESC"`).toLowerCase()
    } while (numero !== `esc`)
} else {
    alert(`Tenes que ser Enzo para correr el programa`)
}
