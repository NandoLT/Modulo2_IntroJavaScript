
const groups = {
    A: [],
    /* B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [] */
}
let start= 0
let end = 4

function shuffleTeams(teams) {
    let shuffTeams = teams.sort(() => Math.random() - 0.5) 
    return shuffTeams
}

export default function makingGroups(teams) {
    const teamsCopy = shuffleTeams(teams)
    for(let key in groups) {
        for(let i = 0; i < teamsCopy.length / 4; i++) {
            groups[key] = teamsCopy.slice(start, end)
        }
        start = end
        end += 4
    }
    return groups
}


