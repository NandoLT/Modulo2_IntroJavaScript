/**
 * Equipos que han pasado la fase de grupos 
 * juegan la fase final con:
 * Octavos de final
 * Cuartos de final
 * Semifinal
 * Final
 * Los puestos a destcar serán:
 * Primero y Segundo (equipos que juegan la final)
 * Tercer y Cuarto Puesto (a disputar entre los perdedores de la semifinal)
 */
import {LOCAL, AWAY} from './groupRound.js'


let cont = 0 // un contador para controlar que equipos entran los partidos a mandar a jugar
let match = []
let homeGoals 
let awayGoals
let win
let loser
let nextRound = []

/**
  * 
  * @param {array} finalistTeams 
  * @description Partimos los equipos en dos arrays para simular la tabla de enfrentamientos
                    de la ronda final y así evitariamos que dos equipos de un mismo grupo
                    coincidan antes de la final.
                    Al final del reparto mandamos el array a octavos
  */
export default  function teamsDistribution(finalistTeams) {
    let teamsA = []
    let teamsB = []
    let posA = 0 // posA y PosB se usan en teamDistribution para alternando la selección de equipos
    let posB = 1
    for(const teams of finalistTeams) {
        teamsA.push(teams[posA])
        teamsB.push(teams[posB])
        if(posA == 0) {
            posA = 1
        } else {
            posA = 0
        }
        if(posB == 1) {
            posB = 0
        } else {
            posB = 1
        }
    }
    console.log('')
    console.log('=====================================')
    console.log('=== COMIENZA LA FASE ELIMINATORIA ===')
    console.log('=====================================')
    console.log('')
    finalistTeams = [[...teamsA], [...teamsB]]
    roundOfEighths(finalistTeams)
}

/**
 * 
 * @param {Array[Array]} finalistTeams 
 * @Description Octavos de Final. Para cada Array contenido en finalistTeams, extraemos equipos de dos en dos
 *              para este fin nos ayuda el contador, que limita cuantos equipos entran a "match"
 *              para enviarlos "playMatch". Esta nos retorna el ganador que almacenamos en nextRound.
 *              Cada vez que mandamos dos equipos su partido reiniciamos el contador y limpiamos 
 *              el array de "match"
 *              Con los equipos almacenados en nextRound llamamos a la función de cuartos. 
 */
function roundOfEighths(finalistTeams) {
    console.log('======= OCTAVOS DE FINAL=======')
    console.log('')
    for(const finalist of finalistTeams){
        for(const team of finalist) {
            match.push(team)
            cont++
            if(cont % 2 == 0){
                win = playMatch(match)
                nextRound.push(win)
                cont = 0
                match = []
            }
        }
    }
    roundOfFourths(nextRound)
}


/**
 * 
 * @param {Array} finalistTeams 
 * @Description Cuarto de final. Para cada elemento contenido en finalistTeams, cogemos el equipo y 
 *              usamos el mismo método que en octavos con el uso del contador y el array "match", almacenando
 *              el ganador otra vez en nextRound(que vaciamos al entrar en la función).
 *              Con nextRound llamamos a la función de semifinal
 */
function roundOfFourths(finalistTeams) {
    let teams = [...finalistTeams]
    nextRound = []
    console.log('')
    console.log('======= CUARTOS DE FINAL =======')
    console.log('')
    for(const team of teams) {
        match.push(team)
        cont++
        if(cont % 2 == 0){
            win = playMatch(match)
            nextRound.push(win)
            cont = 0
            match = []
        }
    }
    semifinal(nextRound)
}

/**
 * 
 * @param {Array} finalistTeams 
 * @var {Array} teams
 * @var {Array} thirdFourth
 * @var {Array} finalist
 * @Description Semifinal. Para cada elemento contenido en teams (copia de finalistTeams), jugamos el aprtido
 *              como en funciones anteriores. En este caso capturamos el ganador y el perdedor
 *              de cada partido para añadirlos a los correspondientes array de la final o tercer y cuarto puesto.
 *              Al finalizar se invoca la función trhirAndFourth y final con sus correspodientes arrays, que contienen los 
 *              equipos ganadores y perdedores de los partidos disputados.
 */
function semifinal(finalistTeams) {
    let teams = [...finalistTeams]
    let thirdFourth = []
    let finalists = []
    console.log('')
    console.log('======= SEMIFINAL =======')
    console.log('')
    for(const team of teams) {
        match.push(team)
        cont++
        if(cont % 2 == 0){
            win = playMatch(match)
            finalists.push(win)
            loser = match.filter(function(value){
                return value !== win
            })
            thirdFourth.push(loser[0])
            cont = 0
            match = []
        }
    }
    thirdAndFourth(thirdFourth)
    final(finalists)
}


/**
 *  
 * @param {Array} teams 
 * @Description Se disputa tercer y cuarto puesto, el sistema de partido es igual a lo disputado
 *              anteriormente
 */
function thirdAndFourth(teams) {
    console.log('')
    console.log('======= TERCER Y CUARTO PUESTO =======')
    console.log('')
    for(const team of teams) {
        match.push(team)
        cont++
        if(cont % 2 == 0){
            playMatch(match)
            cont = 0
            match = []
        }
    }
}


/**
 *  
 * @param {Array} teams 
 * @Description Se disputa tercer y cuarto puesto, el sistema de partido es igual a lo disputado
 *              anteriormente.
 *              Al finalizar mostramos por pantalla información del ganador
 */
function final(teams) {
    console.log('')
    console.log('======= FINAL =======')
    console.log('')
    for(const team of teams) {
        win = match.push(team)
        cont++
        if(cont % 2 == 0){
            playMatch(match)
            cont = 0
            match = []
        }
    }
    console.log('')
    console.log('====================================')
    console.log(`¡${win} campeón del mundo!`)
    console.log('====================================')
}

/**
 * Sistema para jugar los partidos
 * Si hay empate prorroga
 * si empate penaltis
 * si la tanda de 5 penaltis empatan pasan a muerte súbita
 */

/**
 * @description Función para generar goles.
 */

function  generateGoals() {
    return Math.round(Math.random() * 10)
}

/**
 * 
 * @param {Array} teams 
 * @return {string} win
 * @var {num} homeGoals
 * @var {num} awayGoals
 * @Description El partido se disputa generando goles de manera aleatoria para cada equipo.
 *              El equipo con más goles es el ganador y así se motstrará por pantalla.
 *              En caso de que empate ejecutamos playExtension() (prórroga, que funcionará de la 
 *              misma forma que playMatch)
 */
function playMatch(teams) {
    homeGoals = generateGoals()
    awayGoals = generateGoals()
    if(homeGoals == awayGoals) {
        playExtension(teams)
    } else if(homeGoals > awayGoals) {
        win = teams[LOCAL]
        console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} => ${win}`)
    } else {
        win = teams[AWAY]
        console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} => ${win}`)
    }
    return win
}

/**
 * 
 * @param {Array} teams 
 * @return {string} win
 * @var {num} homeGoals
 * @var {num} awayGoals
 * @description La dinámica es igual a la función que la llama pero en goles locales y visitantes 
 *              lo que hacemos es incrementar el valor sobre lo que ya hubiera.
 *              En caso de empate jugamos playPenalties()
 */
function playExtension(teams) {
    homeGoals += generateGoals()
    awayGoals += generateGoals()
    if(homeGoals == awayGoals) {
        playPenalties(teams)
    } else if(homeGoals > awayGoals) {
        win = teams[LOCAL]
        console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} [PRORROGA] => ${win}`)
    } else {
        win = teams[AWAY]
        console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} [PRORROGA] => ${win}`)
    }
    return win
} 

/**
 * 
 * @param {array} teams 
 * @var {array} localPenalties
 * @var {array} awayPenalties
 * @var {boolean} cahngeTurn
 * @Description Se juega una ronda de 5 penalties con un ciclo for en el que dentro de un mosmo
 *              ciclo se turna los jugadores gracias al boleano cahngeTurn. Almacenamos y y 0
 *              en los array localPenalties y awayPenalties, com oacierto y fallos.
 *              Una ez tirados todos, comprobamos con checkPenalties() si el array está empatado o no.
 *              Si no está empatado establecemos un ganador y mostramos la tanda de tiradas por pantalla.
 *              En caso de empate vamos a suddenDeath()
 *              
 */
function playPenalties(teams) {
    console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} [PRORROGA]`)
    console.log('----- Tanda de penaltis')
    let localPenalties = []
    let awayPenalties = []
    let changeTurn = false
    for(let i = 0; i <= 5; i++) {
        localPenalties.push(shootPenalty())
        changeTurn = true
        if(changeTurn == true){
            awayPenalties.push(shootPenalty());
        }
    }
    let localTotal = checkPenalties(localPenalties)
    let awayTotal = checkPenalties(awayPenalties)
    localTotal > awayTotal ?  win = teams[LOCAL] :  win = teams[AWAY]
    if(localTotal == awayTotal) {
        suddenDeath(teams, localPenalties, awayPenalties)
    } else {
        console.log(`${teams[LOCAL]} => ${localPenalties}`)
        console.log(`${teams[AWAY]} => ${awayPenalties}`)
        console.log(`WIN => ${win}`)
        console.log('')
    }
    return win 
}

/**
 * @description random entre 0 y 1 para ejemplificar penaltis.
 */
function shootPenalty(){
    return Math.round(Math.random());
}

/**
 *      
 * @param {array} penalties 
 * @description Recorremos el array sumando los items 0 y 1 esto nos ayudará en la función correspondiente
 *              a establecer quien gana o si ha habido empate.
 */
function checkPenalties(penalties) {
    return penalties.reduce((a, b) => a + b, 0);
}

/**
 * 
 * @param {Array} teams 
 * @param {Array} localPenalties 
 * @param {Array} awayPenalties 
 * @var {num} shootA
 * @var {num} shootb
 * @description En este punto los equipos tiran su correspondiente penaltie (shoot y shootB)
 *              - Si este es igual se sigue con otra ronda.
 *              - Si es una mayor que otro o menor ya tenemos ganador puesto que uno habrá sido 
 *                  un 0 y otro un 1.
 */
function suddenDeath(teams, localPenalties, awayPenalties){
    let shootA
    let shootB
    do{
        shootA = shootPenalty()
        shootB = shootPenalty()
        if(shootA > shootB) {
            localPenalties.push(shootA)
            awayPenalties.push(shootB)
            console.log(`${teams[LOCAL]} => ${localPenalties} =>${teams[LOCAL]}`)
            console.log(`${teams[AWAY]} => ${awayPenalties}`)
            console.log('')
            win = teams[LOCAL]
        } else if(shootA < shootB) {
            localPenalties.push(shootA)
            awayPenalties.push(shootB)
            console.log(`${teams[LOCAL]} => ${localPenalties}`)
            console.log(`${teams[AWAY]} => ${awayPenalties} =>${teams[AWAY]}`)
            console.log('')
            win = teams[AWAY]
        } else {
            localPenalties.push(shootA)
            awayPenalties.push(shootB)
        }
    }while(shootA == shootB)
    return win
}

