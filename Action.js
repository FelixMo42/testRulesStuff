

export class Area {

}

export class Target {

}

export class Effect {

}

export class Component {
    constructor({roll, area, target, effect, subcomponents}) {
        this.roll = roll //new Roll()
        this.area = area //new Area()
        this.target = target //new Target()

        this.effects = effect || []
        this.subcomponents = subcomponents || []
    }
}

export default class Action {
    constructor({source, cost, components}) {
        this.source = source
        this.cost = cost
        this.components = components
    }

    activate(component, parent) {
        let roll = component.roll(this.source, parent)
        let target = component.target(this.source, parent)

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

    cheak() {

    }

    use() {
        if (!this.cheak()) {
            return false
        }

        this.activate(this.cost)

        this.components.forEach(component => {
            this.activate(component, {})
        })

        return true
    }
}