export class Block {
    constructor({player}) {
        this.player = player
        this.skills = new Map()
        this.size = 10
        this.level = 0
    }

    calculate() {
        let skills = []

        for (let skill of this.getSkills().values()) {
            skills.push(skill)
            skills.sort((a, b) => a.getRawLevel() < b.getRawLevel())
            skills = skills.slice(0, 10)
        }

        this.level = skills.reduce((level, skill) => {
            return level + skill.getRawLevel()
        }, 0) / this.size
    }

    getSkills() {
        return this.skills
    }

    getSkill(skill) {
        if (!this.skills.has(skill)) {
            this.skills.set(skill, new Skill({
                ...skill,
                block: this,
                player: this.getPlayer()
            }))
        }
        
        return this.skills.get(skill)
    }

    getPlayer() {
        return this.player
    }

    getLevel() {
        return this.level
    }
}

export default class Skill {
    constructor({block, player}) {
        this.block = block
        this.player = player
        this.level = 0
    }

    getRawLevel() {
        return this.level
    }
    
    levelUp(amu) {
        this.level += amu
        this.block.calculate()
    }

    getBlock() {
        return this.block
    }

    getLevel(bonus=0) {
        return  this.getBlock().getLevel() + this.getRawLevel() + bonus
    }
}