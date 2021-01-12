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
let teamsA = []
let teamsB = []
let posA = 0
let posB = 1
let cont = 0 // un contador para controlar que equipos entran los partidos a mandar a jugar
let match = []
let homeGoals 
let awayGoals
 //Partimos los equipos en dos arrays para simular la tabla de enfrentamientos
 //de la ronda final y así evitariamos que dos equipos de un mismo grupo
 //coincidan antes de la final
export default  function teamsDistribution(finalistTeams) {
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
    finalistTeams = [[...teamsA], [...teamsB]]
    roundOfEighths(finalistTeams)
}

 //Octavos de final
function roundOfEighths(finalistTeams) {
    console.log('======= OCTAVOS DE FINAL=======')
    for(const finalist of finalistTeams){
        for(const team of finalist) {
            match.push(team)
            cont++
            if(cont % 2 == 0){
                playMatch(match)
                cont = 0
                match = []
            }
        }
    }
}


 //Cuartos de final
function roundOfFourths() {

}


 //Semifinal
function semifinal() {

}


//Tercer y cuarto puesto
function thirdAndFourth() {

}


//Final
function final() {

}

//Sistema para jugar los partidos
//Si hay empate prorroga
//si empate penaltis
//si la tanda de 5 penaltis empatan pasan a muerte súbita
function  generateGoals() {
    return Math.round(Math.random() * 10)
}
function playMatch(teams) {
    homeGoals = generateGoals()
    awayGoals = generateGoals()

    if(homeGoals == awayGoals) {
        playExtension(teams)
    } else if(homeGoals > awayGoals) {
        const win = teams[LOCAL]
        console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} => ${win}`)
    } else {
        const win = teams[AWAY]
        console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} => ${win}`)
    }
}
function playExtension(teams) {
    homeGoals += generateGoals()
    awayGoals += generateGoals()
    if(homeGoals == awayGoals) {
        playPenalties(teams)
    } else if(homeGoals > awayGoals) {
        const win = teams[LOCAL]
        console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} [PRORROGA] => ${win}`)
    } else {
        const win = teams[AWAY]
        console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} [PRORROGA] => ${win}`)
    }
}
function playPenalties(teams) {
    console.log(`${teams[LOCAL]} ${homeGoals} - ${awayGoals} ${teams[AWAY]} [PRORROGA]`)
    console.log('----- Tanda de penaltis')
    let localPenalties = []
    let awayPenalties = []
    let changeTurn = false
    let win
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
        console.log(`WIN ${win}`)
    }
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
            console.log(`${teams[LOCAL]} => ${localPenalties}`)
            console.log(`${teams[AWAY]} => ${awayPenalties}`)
        } else if(shootA < shootB) {
            localPenalties.push(shootA)
            awayPenalties.push(shootB)
            console.log(`${teams[LOCAL]} => ${localPenalties}`)
            console.log(`${teams[AWAY]} => ${awayPenalties}`)
        } else {
            localPenalties.push(shootA)
            awayPenalties.push(shootB)
        }
    }while(shootA == shootB)
}