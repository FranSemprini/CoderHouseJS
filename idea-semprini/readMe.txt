El TP Final sera un programa para trackear y llevar control de ratones en un bioterio.

Los ratones se encontraran en dos tipos de jaulas. Parentales y No Parentales.
Jaulas Parentales: Almacenan "Padres", y sus crias seran asignadas a la caja luego de que estas sean movidas a una caja no parental.
Jaulas No parentales: Almacenan "Pups", estas jaulasno tienen padres, y los pups que entran a estas jaulas traen con sigo el codigo de su jaula parental.
Padres: Ratones que tienen un id unico, genero, gen, fecha de nacimiento y el codigo de la caja en la que se encuentran
Pups: Ademas de los datos que tienen los padres los pups tienen un earCode unico por caja (es decir el codigo se repite en todas las cajas, pero no dentro de las mismas) y el codigo de la jaula de la que vienen (jaula parental).

Operacion
*Es necesario crear una jaula parental en caso de querer introducir padres, y es necesario crear una jaula no parental Y una parental para crear pups. 
*Todas las jaulas se almacenan en el array jaulas[]
creaJaula(`parental`) -> Crea un jaula parental
creaJaula(`noparental`) -> Crea una jaula no parental

creaRaton(numero-de-jaula-a-la-que-va) -> Siempre va a crear un padre, porque no viene de otra jaula
creaRaton(numero-de-jaula-a-la-que-va, numero-de-jaula-de-la-que-viene) -> Siempre va a crear pups (crea hasta 5 por jaula), porque va a una jaula y viene de otra.

filtaJaulas(`parental`) -> Devuelve las jaulas parentales
filtaJaulas(`noparental`) -> Devuelve las jaulas no parentales

filtraRatones(`padres`) -> Devuelve todos los ratones que son padres
filtraRatones(`pups`) -> Deveulve todos los ratones pups

----------------------Ejemplo---------------
creaJaula(`parental`) -> Le asigno el codigo 1
creaJaula(`noparental`) -> Le asigno el codigo 2
creaRaton(1) -> creo un macho en la jaula 1, este raton se encontrara en el array `parents` de la jaula 1.
creaRaton(1) -> creo una hembra en la jaula 1, este raton se encontrara en el array `parents` de la jaula 1.
creaRaton(2,1) -> creo ratones que van a la jaula 2, y vienen de la 1. Estos ratones se encontraran en el array `pups` de jaula 1 Y jaula dos. Sin embargo al filtrar ratones solo seran visibles los que es encuentran en las jaulas no parentales (para evitar resultados duplicados).

puedo usar las funciones filtraJaulas() o filtraRatones() para ver los ratones que tengo en este momento.

TBD* 
Convertir pups a padres, llevando consigo sus codigos anteriores al moverlos a cajas parentales.
Utilizar los genes ingresados para calcular cuales deberian ser los genes de los pups. 
Filtrado por numero de jaula.
