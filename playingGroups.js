// Se juegan los partidos de la fase grupos

/**
 * 
 * @param {Array} teamNames 
 * @description Creamos un Objeto para cada grupo (Se crea durante su turno de ejecución)
 *              donde se almacenan una serie de campos, necesarios para los resumentes d 
 *              jornada
 * @returns {Object} teams
 * 
 */
export function setupTeams(teamNames) {
    let teams = []
    for (const teamName of teamNames) {
        const team = customizeTeam(teamName)
        teams.push(team)
    }
    return teams
}

/**
 * 
 * @param {Array} teamName
 * @description Complemento de la función setupTeams
 *            
 */
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

/**
 * @description Función para generar un número aleatorio de goles
 *              entre 0 y 10
 * 
 */
function  generateGoals() {
    return Math.round(Math.random() * 10)
}


/**
 * 
 * @param {num} homeGoals 
 * @param {num} awayGoals 
 * @param {string} equipo 
 * @param {boolean} localTeam 
 * @description Sistema para asignar los goles al equipo local y visitante.
 *              LocalTeam se asigna como true o falsedesde la función que la invoca,
 *              en función de esto entremos en una parte u otra del condicional
 *              
 */
function goalDistribution(homeGoals, awayGoals, equipo, localTeam) {
        if(localTeam) {
            equipo.goalsFor += homeGoals
            equipo.goalsAgainst += awayGoals
        } else {
            equipo.goalsFor += awayGoals
            equipo.goalsAgainst += homeGoals
        }
}

/**
 * 
 * @param {Array} teams (equipos que disputan el partido en curso)
 * @param {Object} teamsData 
 * @return {Object} teamsData, resultados de los equipos que disputan los partidos, nombre, goles a favor
 *                  , en contra ...etc
 * @var {string} localTeam
 * @var {string} winningTeam
 * @var {string} losingTeam
 * @var {array} result
 * @var {num} homeGoals
 * @var {num} awayGoals
 * @description  Llegando como parametros los equipos que disputan el encuentro y el objeto 
 *                  con los datos de los equipos del grupos, se disputa el encuentro.
 *                  en result, se guardan los equipos, local y visitante seguidos de los goles locales y 
 *                  y visitantes (que usaremos para mandar datos al objeto teamsData).
 *                  Mostramos el resultado del encuentro por pantalla.
 *                  Establecemos el ganador y el perdedor del encuentro.
 *                  Con los datos proporcionados por teams, hacemos funciona un bucle for que recoge el nombre
 *                  del equipo y en función de este distribuye el goles (llamando a la función correspondiente)
 *                  así como el reparto de puntos.
 *                  Al final de la primeroa vuelta (sólo tiene dos, ya que solo entran dos equipos en cada turno de partido)
 *                  cambiamos local TEam a false para que la distribución de goles sea correcta en la nueva   
 *                  llamada a la función de reparto de goles.
 *                  teamsData, se va completando en los suvesivos turno de cada jornada para que en su 
 *                  momento los datos que almacena nos ayuden a mostrar el reusmen de la jornada. 
 */
export function playMatch(teams, teamsData) {
    let localTeam= null
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
        if(i == 0){
            localTeam = true
        }
        teamsData.find(equipo => {
            if(equipo.name === team) {
                goalDistribution(homeGoals, awayGoals,equipo, localTeam)
                if(winningTeam === equipo.name) {
                    equipo.matchesWon += 1
                    equipo.points += 3
                } else if(losingTeam === equipo.name) {
                    equipo.matchesLost +=1
                    equipo.points += 0
                }else{
                    equipo.matchesDrawn +=1
                    equipo.points += 1
                }
            }
        })
        localTeam = false
    }
    return teamsData
}