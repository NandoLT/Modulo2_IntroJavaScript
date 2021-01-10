// Se juega la fase grupos


export function setupTeams(teamNames) {
    let teams = []
    for (const teamName of teamNames) {
        const team = customizeTeam(teamName)
        teams.push(team)
    }
    return teams
}

function customizeTeam(teamName) {
    return {
        name: teamName,
        points: 0, 
        matchesWon: 0,
        matchesDrawn: 0,
        matchesLost: 0, 
        goalsFor: 0,
        goalsAgainst: 0,
    }
}
function goalsForAgainst(goalsFor, goalsAgainst) {
    return goalsFor - goalsAgainst
}
function  generateGoals() {
    return Math.round(Math.random() * 10)
}
function goalDistribution(homeGoals, awayGoals, equipo, /*result , winningTeam,losingTeam */) {
        if(homeGoals > awayGoals) {
            equipo.goalsFor += homeGoals
            equipo.goalsAgainst += awayGoals
        } else {
            equipo.goalsFor += homeGoals
            equipo.goalsAgainst += awayGoals
        }
}
export function playMatch(teams, teamsData) {
    let winningTeam = null
    let losingTeam = null
    const result = [...teams] //equipo local, equipo_visitante, goles_local, goles_visitante
    const homeGoals = generateGoals()
    const awayGoals = generateGoals()
    result.push(homeGoals, awayGoals)
    console.log(`${result[0]} ${result[2]} VS ${result[1]} ${result[3]} `)

    if(homeGoals > awayGoals) {
        winningTeam = result[0]
        losingTeam = result[1]
    } else if (homeGoals < awayGoals) {
        losingTeam = result[0]
        winningTeam = result[1]
    } 
    for(let i = 0; i < 2; i++){
        const team = result[i]
        teamsData.find(equipo => {
            if(equipo.name === team) {
                goalDistribution(homeGoals, awayGoals,equipo/* , result */)
                if(winningTeam === equipo.name) {
                    equipo.matchesWon += 1
                    equipo.points += 3
                } else if(losingTeam === equipo.name) {
                    equipo.matchesLost +=1
                    equipo.points += 0
                }else{
                    equipo.goalsFor += result[2]
                    equipo.goalsAgainst += result[3]
                    equipo.matchesDrawn +=1
                    equipo.points += 1
                }
            }
        })
    }
    /* console.log(teamsData) */
    return teamsData
}