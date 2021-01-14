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

 //Octavos de final
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


 //Cuartos de final
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


 //Semifinal
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


//Tercer y cuarto puesto
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


//Final
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

//Sistema para jugar los partidos
//Si hay empate prorroga
//si empate penaltis
//si la tanda de 5 penaltis empatan pasan a muerte súbitagit add
function  generateGoals() {
    return Math.round(Math.random() * 10)
}

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
            awayPenalties.push(Math.round(Math.random()));
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

function shootPenalty(){
    return Math.round(Math.random());
}

function checkPenalties(penalties) {
    return penalties.reduce((a, b) => a + b, 0);
}

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

