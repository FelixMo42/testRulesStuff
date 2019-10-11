import Action from "./Action.js"
import Map from "./Map.js"
import Player from "./Player.js"

// HOW IT SHOULD WORK -->

// set up

let player = new Player({})
let enemy = new Player({})

let action = new Action({
    
})

let map = new Map({width: 10, height: 10})

map.get({x: 1, y: 1}).setPlayer( player )
map.get({x: 8, y: 8}).setPlayer( enemy )