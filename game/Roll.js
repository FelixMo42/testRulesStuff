import D from "./D.js"
import Player from "./Player.js"

export default class Roll {
    roll() {
        return D(20)
    }
}

export class NoneRoll {
    roll() {
        return -1
    }
}

export class SkillRoll extends Roll {
    constructor({stat, skill}) {
        super()
        
        this.stat = stat
        this.skill = skill
    }

    roll(source) {
        let base = super.roll()

        base += source.getSkill(this.skill).getLevel()
        base += source.getStat(this.stat)

        return base
    }
}