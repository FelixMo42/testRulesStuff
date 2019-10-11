import D from "./D"

class Roll {
    roll() {
        let base = D(20)

        return base
    }
}

class Area {

}

class Target {

}

export class Effect {

}

export class Component {
    constructor() {
        this.roll = new Roll()
        this.area = new Area()
        this.target = new Target()

        this.effects = []
        this.subcomponents = []
    }
}

export default class Action {
    constructor() {
        this.components = []
    }

    activate(component, parent) {
        let roll = component.roll(parent)
        let target = component.target(parent)

        component.area.forEach(target => {
            component.effects.forEach(effect => {
                target.affect({
                    dc: roll,
                    source: this,
                    effect: effect
                })
            })
        })

        component.subcomponents.forEach(subcomponent => {
            this.activate(subcomponent, {
                roll: roll,
                target: target
            })
        })
    }

    use() {
        this.components.forEach(component => {
            this.activate(component, {})
        })
    }
}
