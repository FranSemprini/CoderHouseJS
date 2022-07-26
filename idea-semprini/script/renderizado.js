const muestraRatones = (datoABusacar, dato, tipo) => {
    mainContainer.innerHTML = ``
    filtrados = filtaRatones(datoABusacar, dato, tipo)
    if (filtrados !== undefined) {
        filtrados.reverse().forEach(raton => {
            const { tipo, actualBarcode, previousBarcode, birth, earCode, gen, gender } = raton
            const div = document.createElement(`div`)
            div.innerHTML = ` <div id=card class="card blue__border">
        <h1 class="card__title">RATON - ${tipo.toUpperCase()}</h1>
        <section id="cardRow" class="card__row light__grey">
        <p id="raton__previousBarcode">Barcode: ${actualBarcode}</p>
        ${previousBarcode[0] !== false ? ` <p id="raton__previousBarcode">Previous Barcode: ${previousBarcode}</p>` : `<p id="raton__previousBarcode">Previous Barcode: None</p>`}
        </section>
        <section id="cardRow" class="card__row">
        <p id="raton__bitrth">Birth: ${birth}</p>
        <p id="raton__earCode">Earcode: ${earCode}</p>
        </section>
        <section id="cardRow" class="card__row light__grey">
        <p id="raton__gen">Gen: ${gen}</p>
        <p id="raton__gender">Gender: ${gender}</p>
        </section></div>
        `
            mainContainer.append(div)
        })
    }
}

const muestraJaulas = (element) => {
    mainContainer.innerHTML = ''
    element.forEach(jaula => {
        if (Object.keys(jaula).length > 2) {
            const { barcode, cageName, tipo, date, parents, pups } = jaula
            const div = document.createElement('div')
            div.innerHTML = ` <div id=card class="card blue__border">
    <h1 class="card__title">JAULA</h1>
    <section id="cardRow" class="card__row light__grey">
    <p id="jaula__barcode">Barcode: ${barcode}</p>
    <p id="jaula__cageName">Cage Name: ${cageName}</p>
    </section>
    <section id="cardRow" class="card__row">
    ${tipo === `parental` ? `<p id="jaula__tipo">Tipo: Parental</p>` : ` <p id="jaula__tipo">Tipo: Pups</p>`}
    <p id="jaula__fecha">Fecha: ${date}</p>
    </section>
    <section id="cardRow" class="card__row light__grey">
    ${parents[0] !== false ? `<p id="jaula__">Parents: ${parents.length}</p>` : `<p id="jaula__">Parents: 0</p>`}
    ${pups[0] !== false ? `<p id="jaula__">Pups: ${pups.length}</p>` : `<p id="jaula__">Pups: 0</p>`}
    </section></div>
    `
            mainContainer.append(div)
            div.addEventListener(`click`, () => {
                muestraRatones(`barcode`, jaula.barcode)
            })
        }
    });
};


