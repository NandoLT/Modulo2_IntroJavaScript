import {teamsWorldCup} from './teams.js'
import {maxMatchDaysCalc} from './planification.js'
import setPlanification from './planification.js'
import makingGroups from './makingGroups.js'
/**
 * Desde index.js lanzamos la ejección de una srie de funciones que:
 *  1.- Dado un conjunto de equipos (32 equipos clasificados para el mundial)
 *      estos se distribuiran en grupos desde la A hasta la H con cuatro equipos por grupo.
 *      Estos jugaran una liguilla de todos contra todos (tres jornadas por grupo).
 *  2.- Primero y segundo de cada equipo pasan a la fase de grupos (16 equipos en total).
 *      Jugando el primero de grupo A con segundo de grupo B, segundo de grupo A con primero de grupo B...
 *      y así de manera consecutiva el resto de grupos con la misma dinámica. 
 *      Pasa a la siguiente ronda el ganador.
 *      Rondas: Octavos, Cuartos, Semifinal y Final.
 *  3.- Se estableceran los puestos para primero y segundo (campeón y subcampeón), así como para 
 *      tercero y cuerto.
 */

const LOCAL = 0 
const AWAY = 1

//Formamos los grupos con los 32 equipos. De la A a la H
const groups = makingGroups(teamsWorldCup)

//Planificamos las jornadas para cada grupo. Mostramos grupos y jornadas por pantalla
maxMatchDaysCalc(groups.A) //
for(let key in groups) {
    console.log(' _________')
    console.log('|GRUPO', key,' |')
    console.log(' ---------')
    groups[key].forEach(team => console.log(team))

    const planification = setPlanification(groups[key])
    for(let i = 0; i < planification.length; i++){
        console.log(' ')
        console.log('JORNADA', i+1)
        console.log('=======')
        for (let j = 0; j < 2; j++) {
            console.log(`${planification[i][j][LOCAL]} VS ${planification[i][j][AWAY]}`)
        }
    }
}

//Jugamos los partidos
/**
 * necesitamos equipo, puntos, goles a favor, goles en contra, diferencia de goles
 * mostrar con log.table
 */