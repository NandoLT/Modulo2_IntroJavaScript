import setPlanification from './planification.js'
import {setupTeams} from './playingGroups.js'
import {playMatch} from './playingGroups.js'

let planification = null
let teamsdata = null
let match = []
let journey = 1
let teamsNextRound = []
export const LOCAL = 0 
export const AWAY = 1

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

export function groupsMatchs(groups, groupsInfoMatch) {
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