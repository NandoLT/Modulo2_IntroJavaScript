import {teamsWorldCup} from './teams.js'
//Algoritmo de ordenación basado en RoundRobin
/**
 * TEORÍA:
 * Equipos en dos filas 
 *  A B C D
 *  H G F E
 *  Total equipos = N
 * 
 * Esta ordenación nos da la primera ronda de las N - 1  rondas.
 * Luego el primer elemento de la primera fila lo quedamos fijo y rotamos el resto
 * 
 *  A H B C                A G H B                  A F G H
 *  G F E D   Seguimos:    F E D C   Siguiente:     E D C B ...... hasta N -  1
 * 
 * Si tenemos número impar de equipos incluimos un equipo ficticio y lo ponemos a rotar
 * como el resto al equipo que le vaya tocando en la rotación esa semana descansa
 */

//const teams = teamsWorldCup                     //Equipos
const planification = []  
let maxMatchDays = null                      //Array superior que contiene MatchDays
const matchDays = []                            //Array de segundo nivel, contiene match
let   firstTeams = []                           //Primera fila de equipos
let   secondTeams = []                          //Segunda fila de equipos

/**
 * 
 * @param {Object} groups 
 * @description Nos creamos una copia del objeto Groups para mantener los datos
 */
export function groupsCopier(groups){
    let groupCopy = {}
    for(let key in groups) {
        let group = []
        groupCopy[key] = group
        for(let a = 0; a < groups[key].length; a++) {
            groupCopy[key].push(groups[key][a])
        }
    }
    return groupCopy
}

/**
 * 
 * @param {Array} teams 
 */
export function maxMatchDaysCalc(teams){
    maxMatchDays = teams.length - 1 
}

/**
 * @description Añadimos un elemento null al final del array teams
 *              para en caso de ser impar el número de elementos, 
 *              hacer que este sea par
 */
function roundOdd(teams) {
    teams.push(null)
    maxMatchDays++
}

/**
 * @param {Array} teams 
 * @description Separamos los equispos en dos arrays.
 *              El segundo lo invertimos. De esta forma obtenemos
 *              la configuración para poder hacer las rotaciones
 */

function splitTeams(teams){
    firstTeams = teams.splice(0, teams.length / 2)
    secondTeams = teams.splice ((teams.length / 2) - 1, teams.length).reverse()
}

/**
 * @description Rotamos los elementos de los arrays entre los arrays
 */
function rotateTeams(){
    secondTeams.push(firstTeams[firstTeams.length -1])
    firstTeams.pop()
    firstTeams.splice(1, 0, secondTeams[0])
    secondTeams.shift()
}

/**
 * @description Establecemos la estructura de datos:
 *              Array principal "planification" que contendrá
 *              un array para cada jornada (matchDays) y estas
 *              a su vez contendrán un array por cada partido de la joranada.
 *              Como el número de jornadas es N-1, si el número de equipos es impar
 *              y vamos a añadir un elemento "null", corregimos el maxMatchDays sumando + 1
 */
function initPlanification(teams) {
    if (teams.length % 2 !== 0){
        maxMatchDays++
    }
    for( let i = 0; i < maxMatchDays; i++) {
        planification[i] = [...matchDays]
    }
}

/**
 *  
 * @param {Array} teams 
 * @description Establecemos las jornadas y los partidos a disputar.
 *              
 */
export default function setPlanification(teams) {
    maxMatchDaysCalc(teams)
    if (teams.length % 2 !== 0){                // Comprobamos que el número de equipos
        roundOdd(teams)                         // es par en caso contrario -> roundOdd()
    }
    const teamsCopy = [...teams]
    initPlanification(teams)                     // Componemos la matriz de arrays
    splitTeams(teams)                           // Dividimos los equipos en dos bloques

    for(let i = 0; i < maxMatchDays; i++) {     //En el doble for vamos rellenando el bloque de arrays planificaction->MatchDays->Match
        for(let j = 0; j < teamsCopy.length / 2; j++) {
            planification[i][j] = [firstTeams[j], secondTeams[j]]
            if(i !== maxMatchDays && j == Math.ceil(teamsCopy.length /2) - 1) {
                rotateTeams()
            }
        }
    }
    return planification
}
