import setPlanification from './planification.js'
import {setupTeams} from './playingGroups.js'
import {playMatch} from './playingGroups.js'

let planification = null
let teamsNextRound = []
let journey = 1
export const LOCAL = 0 
export const AWAY = 1

/**
 * 
 * @param {object} groupsInfoMatch 
 * @description Pasamos un objeto con los grupos, cada grupo (clave), 
 *              contiene un array con los equipos de ese grupo,
 *              Mostramos información de composición de cada grupo, 
 *              así como de la distribución de partidos por jornadas. 
 */
export function infoMatchs(groupsInfoMatch) {
    console.log('GRUPOS Y EQUIPOS')
    console.log('================')
    console.log('')
    for(let key in groupsInfoMatch) {
        console.log(' _________')
        console.log('|GRUPO', key,' |')
        console.log(' ---------')
        groupsInfoMatch[key].forEach(team => console.log(team))
        planification = setPlanification(groupsInfoMatch[key])
        for(let i = 0; i < planification.length; i++){
            console.log(' ')
            console.log('JORNADA', i+1)
            console.log('=======')
            for (let j = 0; j < 2; j++) {
                console.log(`${planification[i][j][LOCAL]} vs ${planification[i][j][AWAY]}`)
            }
        }
    }
}

/**
 *  
 * @param {Object} groups 
 * @param {Object} groupsInfoMatch 
 * @returns {Array} Equipos para la ronda de eliminatorias.
 * @description Ejecutamos en primer lugar infoMatchs, para ver toda la 
 *              información de grupos y jornadas.
 *              Seguidamente disputamos los partidos de cada jornada y almacenamos los
 *              datos de los partidos (equipos, goles...), para poder mostrar posteriormente
 *              los resumenes de la jornada.
 *              Al final de la ejeción -> orderSummary que nos ordenara la clasificación 
 */
export function groupsMatchs(groups, groupsInfoMatch) {
    let teamsdata = null
    let match = []
    infoMatchs(groupsInfoMatch)
    console.log('')
    console.log('=================================')
    console.log('====== COMIENZA EL MUNDIAL ======')
    console.log('=================================')
    console.log('')
    for(let key in groups) {
        console.log(' _________')
        console.log('|GRUPO', key,' |')
        console.log(' ---------')
        const groupsToGroupPhase = [...groups[key]]
        planification = setPlanification(groups[key])
        teamsdata = setupTeams(groupsToGroupPhase)
        for(let i = 0; i < planification.length; i++){
            console.log(' ')
            console.log('JORNADA', i+1)
            console.log('=======')
            for (let j = 0; j < 2; j++) {
                match = [planification[i][j][LOCAL], planification[i][j][AWAY]]
                teamsdata = playMatch(match, teamsdata)
            }
        orderSummary(teamsdata)
        }
    }
    return teamsNextRound
}

/**
 * 
 * @param {Object} teamsData 
 * @description Mostramos por pantalla el resumen de la jornada
 *              llamamos al final a la función takeToNextRound para seleccionar
 *              los dos primeros equipos de cada grupo
 */
function summary(teamsData) {
    console.table(teamsData.map(team => {
        return {
            Team: team.name,
            Points: team.points,
            Won: team.matchesWon,
            Drawn: team.matchesDrawn,
            Lost: team.matchesLost,
            GoalsFor: team.goalsFor,
            GoalsAgainst: team.goalsAgainst,
            GoalsDiff: team.goalsFor - team.goalsAgainst
        }
    }))
    takeToNextRound(teamsData)
}

/**
 * 
 * @param {Object} teamsdata 
 * @description Ordenamos la clasificación:
 *                 - Por puntos
 *                 - Si empatan, tendremos en cuenta la diferencia de goles.
 *               Al final de la ejecución -> summary, mostrando el resumen de la jornada 
 *               con la clasificación ya ordenada
 */
function orderSummary(teamsdata) {
    teamsdata.sort(function(teamA, teamB) {
        if(teamA.points > teamB.points) {
            return -1 
        }else if(teamA.points > teamB.points) {
            return 1
        }else {
            const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst
            const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst
            if(goalsDiffA > goalsDiffB) {
                return -1
            }else if(goalsDiffA < goalsDiffB) {
                return 1
            }else {
                return 0 //pero podriamos seguir filtrando equipos en cao de empate por más parámetros
            }
        }
    })
    summary(teamsdata)
}

/**
 * 
 * @param {Object} teamdata 
 * @description La función se va ejecutando en cada jornada pero no tiene
 *              en cuenta la clasificación hasta la última, momento en el que itera
 *              y toma los dos primeros equipos del grupo que este en ese momento en juego.
 *              Hacemos lo mismo con el resto de grupos que van entrando.
 */
function takeToNextRound(teamdata) {
    let teams = []
    if(journey == 3){
        for(let i = 0; i < 2; i++) {
            teams.push(teamdata[i].name)
        }
        teamsNextRound.push(teams)
        journey = 0
    }
    journey += 1
}