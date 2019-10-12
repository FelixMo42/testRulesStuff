import { Block } from "./Skill.js"

class Skill {
}

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
    }

    // stats and skills

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
