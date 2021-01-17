
const groups = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: []
}
let start= 0
let teamsByGroup = 4

function shuffleTeams(teams) {
    let shuffTeams = teams.sort(() => Math.random() - 0.5) 
    return shuffTeams
}

/**
 *  
 * @param {array} teams 
 * @description Repartimos los 32 equipos en  bloques de 4. Ante de esto
 *              mezclamos el array de equipos para que en cada ejecución   
 *              el sistema de grupos sea diferente.
 */
export default function makingGroups(teams) {
    const teamsCopy = shuffleTeams(teams)
    for(let key in groups) {
        for(let i = 0; i < teamsCopy.length / teamsByGroup; i++) {
            groups[key] = teamsCopy.slice(start, teamsByGroup)
        }
        start = teamsByGroup
        teamsByGroup += 4
    }
    return groups
}


