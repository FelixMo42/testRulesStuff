import D from "./D.js"

export const Component = {
    source: Symbol("source"),
    roll:   Symbol("roll"),
    target: Symbol("target"),
    origin: Symbol("origin"),
    area:   Symbol("area"),
    effect: Symbol("effect")
}

export default class Action {
    constructor({source, cost, components}) {
        this.source = source
        this.cost = cost
        this.components = components
    }

    prepare(targets) {
        if (!this.check(targets)) {
            //TODO: what if check fails
        }

        return () => {
            this.use(targets)
        }
    }

    check(targets) {
        //TODO: check targets
        return true
    }

    use(targets) {
        if (!this.check(targets)) {
            return false
        }

        let rootComponent = {
            source: this.source
        }

        //this.activate(this.cost, rootComponent)

        this.components.forEach(component => {
            this.activate(component, rootComponent)
        })

        return true
    }

    // component stuff

    getComponentSource(source, component) {
        if (!source) {
            return component.parent.source
        }
    }

    getComponentRoll(roll, component) {
        if (!roll) {
            return component.parent.roll
        }

        let base = D(20)

        if ("skill" in roll) {
            base += component.source.getSkill(roll.skill).getLevel()
        }

        if ("bonus" in roll) {
            base += roll.bonus
        }

        return base
    }

    getComponentTarget(target, component) {
        if (!target) {
            return component.parent.target
        }

        let area = this.getComponentArea(target.area, component)
    }

    getComponentOrigin(origin, component) {
        if (!origin) {
            return component.parent.origin
        }
    }

    getComponentArea(area, component) {
        if (!area) {
            return component.parent.area
        }

        let targets = []

        targets.push( component.source.getNode() )        

        return targets
    }

    getComponentEffect(effect, component) {
        if (!effect) {
            return component.parent.effect
        }

        return {}
    }

    activate(component, parent) {
        let data = {parent: parent}

        data.source = this.getComponentSource(component.source, data)
        data.roll   = this.getComponentRoll(component.roll, data)
        data.target = this.getComponentTarget(component.target, data)
        data.origin = this.getComponentOrigin(component.origin, data)
        data.area   = this.getComponentArea(component.area, data)
        data.effect = this.getComponentEffect(component.effect, data)

        data.area.forEach(target => {
            target.affect(data.effect)
        })

        component.subcomponents.forEach(subcomponent => {
            this.activate(subcomponent, data)
        })
    }
}