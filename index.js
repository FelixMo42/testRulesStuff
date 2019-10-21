import Action, { Component, Effects } from "./game/Action.js"
import World from "./game/World.js"
import Player from "./game/Player.js"

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
        { // components
            roll: {
                skill: pyromancy
            },

            target: {
                style: "ball",
                radius: 10,
                origin: Component.origin,
                //player: true,
                type: "player",
                num: 1
            },

            area: {
                style: "ball",
                radius: 1,
                target: Component.target
            },

            effect: {
                type: Effects.damage,
                dc: {
                    base: Component.roll,
                    stat: dex
                },
                damage: {
                    base: Component.roll,
                    stat: wil
                }
            },

            subcomponents: []
        }
    ]
}

let world = new World({
    width: 10,
    height: 10
})

let player = new Player(edenWhite)
world.getNode({x: 0, y: 0}).setPlayer(player)

let action = new Action({
    ...fireBolt,
    source: player
})

console.log( action.prepare()() )

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