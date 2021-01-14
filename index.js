import {teamsWorldCup} from './teams.js'
import {groupsCopier} from './planification.js'
import {maxMatchDaysCalc} from './planification.js'
import makingGroups from './makingGroups.js'
import {groupsMatchs} from './groupRound.js'
import teamsDistribution from './finalRound.js'
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

let teamsNextRound = null
//Formamos los grupos con los 32 equipos. De la A a la H y nos cremamos una copia de seguridad
const groups = makingGroups(teamsWorldCup)
let groupsInfoMatch = {}
groupsInfoMatch = groupsCopier(groups)


//Planificamos las jornadas para cada grupo. Mostramos grupos y jornadas por pantalla
//Jugamos los partidos y recogemos equipos para la fase eliminatoria
maxMatchDaysCalc(groups.A) 
teamsNextRound = groupsMatchs(groups, groupsInfoMatch)

//Pasamos los equipos finalistas al fichero de Ronda Final para ejecute todos las rondas
teamsDistribution(teamsNextRound)
