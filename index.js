import Action from "./Action.js"
import Map from "./Map.js"
import Player from "./Player.js"
import Skill, {Block} from "./Skill.js"

// HOW IT SHOULD WORK -->

// set up

let spellCraft = {}

let player = new Player({})

let pyromancy = {
    block: spellCraft,
}

let s = player.getSkill(pyromancy)
s.levelUp(10)

console.log( player.getSkill(pyromancy).getLevel() )

/*

let player = new Player({})
let enemy = new Player({})

let spellCraft = new Block({})
let pyromancy = new Skill({block: spellCraft})

let action = new Action({
    
})

console.log( player.getSkill(pyromancy).getLevel() )

let map = new Map({width: 10, height: 10})

map.get({x: 1, y: 1}).setPlayer( player )
map.get({x: 8, y: 8}).setPlayer( enemy )

*/