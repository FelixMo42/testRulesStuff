import { Block } from "./Skill.js"
import Action from "./Action.js"

export default class Player {
    constructor({}) {
        this.queue = []

        this.hp = 25
        this.mp = 25

        this.stats = {
            dex: 0,
            str: 0,
            wil: 0,
            per: 0
        }

        this.blocks = new Map()
        this.actions = new Map()
    }

    // outher

    affect(effect) {
        
    }

    // stats, blocks and skills

    getStat(stat) {
        return this.stats[stat]
    }

    getBlock(block) {
        if (!this.blocks.has(block)) {
            this.blocks.set(block, new Block({
                ...block,
                player: this
            }))
        }

        return this.blocks.get(block)
    }

    getSkill(skill) {
        return this.getBlock(skill.block).getSkill(skill)
    }

    // actions

    learnAction(action) {
        this.actions.set(new Action({
            ...action,
            source: this
        }))
    }

    getAction(action) {
        return this.actions.get(action)
    }

    // node

    setNode(node) {
        this.node = node
    }

    getNode() {
        return this.node
    }

    // set plan

    plan(action) {
        this.queue.push(action)
    }

    clearPlan() {
        this.queue = []
    }

    discardPlan() {
        this.queue.pop()
    }
}
