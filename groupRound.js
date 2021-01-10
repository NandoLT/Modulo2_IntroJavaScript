import setPlanification from './planification.js'
import {setupTeams} from './playingGroups.js'
import {playMatch} from './playingGroups.js'

let planification = null
let teamsdata = null
let match = []
let journey = 1
let teamsNextRound = []
const LOCAL = 0 
const AWAY = 1

export function groupsMatchs(groups) {
    for(let key in groups) {
        console.log(' _________')
        console.log('|GRUPO', key,' |')
        console.log(' ---------')
        groups[key].forEach(team => console.log(team))
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