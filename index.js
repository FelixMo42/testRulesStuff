import Action from "./game/Action.js"
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
        {
            roll: new SkillRoll({
                skill: pyromancy,
                stat: dex
            }),
            area: -1,
            source: -1,
            effects: [
                {
                    effect: "damage",
                    val: 1
                }
            ],
            subcomponents: []
        }
    ]
}

let player = new Player(edenWhite)
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