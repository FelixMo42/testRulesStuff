import Action, { Component } from "./game/Action.js"
import World from "./game/World.js"
import Player from "./game/Player.js"
import Skill, {Block} from "./game/Skill.js"
import Roll, { SkillRoll } from "./game/Roll.js"

// HOW IT SHOULD WORK -->

// set up

const str = "str"
const dex = "dex"
const wil = "wil"
const per = "pwer"

let spellCraft = {}

let pyromancy = {
    block: spellCraft,
}

let edenWhite = {}

let fireBolt = {
    cost: {},
    components: [
        { // componant
            roll: {
                skill: pyromancy
            },

            target: {
                area: {
                    style: "ball",
                    radius: 10,
                    origin: Component.origin,
                },
                select: {
                    player: true,
                    type: "player",
                    num: 1
                },
            },

            area: {
                style: "ball",
                radius: 1,
                target: Component.target
            },

            effect: {
                dc: 1,
                effect: "damage",
                val: 1
            },

            subcomponents: []
        }
    ]
}

let player = new Player({})

let action = new Action({
    ...fireBolt,
    source: player
})
console.log( action.use() )

//let player = new Player(edenWhite)
//player.learn( fireBolt )



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