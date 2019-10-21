import D from "./D.js"

export const Component = {
    source: (component) => component.source,
    roll:   (component) => component.roll,
    target: (component) => component.target,
    origin: (component) => component.origin,
    area:   (component) => component.area,
    effect: (component) => component.effect
}

export const Effects = {
    damage: {
        name: "damage",
        values: (component) => ({
            damage: component.getRoll( component.get("damage") )
        })
    }
}

class ComponentFactory {
    constructor(component, parent) {
        this.component = component
        this.partials = []
        this.data = {
            parent: parent,
            params: parent.params
        }
    }

    // parial code

    config(partial) {
        this.partials.push( this.partial )
        this.partial = partial
    }

    unconfig() {
        this.partial = this.partials.pop()
    }

    shouldInherit() {
        return typeof this.partial == "undefined"
    }

    get(key) {
        let value = this.partial[key]

        if (typeof value == "function") {
            return value(this.data)
        }

        return value
    }

    has(key) {
        return key in this.partial
    }

    // source functions

    getSource(source) {
        this.config(source)

        if ( this.shouldInherit() ) {
            return this.data.parent.source
        }

        this.unconfig()

        //is this what I want?
        //return this.getArea(target, component)
    }

    // roll code

    getRoll(roll) {
        this.config(roll)

        if ( this.shouldInherit() ) {
            return this.data.parent.roll
        }

        let base = 0

        if ( this.has("base") ) {
            base += this.get("base")
        } else {
            base += D(20)
        }

        if ( this.has("skill") ) {
            base += this.data.source.getSkill(this.get("skill")).getLevel()
        }

        if ( this.has("bonus") ) {
            base += this.get("bonus")
        }

        this.unconfig()

        return base
    }

    getTarget(target) {
        this.config(target)

        if (this.shouldInherit()) {
            return this.data.parent.target
        }

        if (target.player) {
            return this.data.params.targets[target]
        }

        this.unconfig()

        return this.getArea(target.area)
    }

    getOrigin(origin) {
        this.config(origin)

        if (this.shouldInherit()) {
            return this.data.parent.origin
        }

        if (origin.player) {
            return this.data.params.targets[target]
        }

        this.unconfig()

        return this.getArea(target.area)
    }

    getArea(area) {
        this.config(area)

        if (this.shouldInherit()) {
            return this.data.parent.area
        }

        let targets = []

        if (area.style == "ball") {
            [this.data.source.getNode()].forEach(target => {
                if (area.type == "player") {
                    targets.push( target.getPlayer() )
                } else if (target.type == "tile") {
                    targets.push( target.getTile() )
                } else {
                    targets.push( target )
                }
            })
        }

        this.unconfig()

        return targets
    }

    // effect functions

    getEffect(effect) {
        this.config(effect)

        if ( this.shouldInherit() ) {
            return this.data.parent.effect
        }
        

        let ret = {
            type: effect.type,
            dc: this.getRoll( this.get("dc") ),
            ...effect.type.values( this )
        }

        this.unconfig()

        return ret
    }

    make() {
        this.data.source =  this.getSource( this.component.source )
        this.data.roll   =  this.getRoll( this.component.roll )
        this.data.target =  this.getTarget( this.component.target )
        this.data.origin =  this.getOrigin( this.component.origin )
        this.data.area   =  this.getArea( this.component.area ) 
        this.data.effect =  this.getEffect( this.component.effect )

        return this.data
    }
}

export default class Action {
    constructor({source, cost, components}) {
        this.source = source
        this.cost = cost
        this.components = components
        this.targets = []

        for (let component of components) {
            this.registerComponent(component)
        }
    }

    registerComponent(component) {
        if ("origin" in component) {
            if (component.origin.player) {
                this.targets.push(component.origin)
            }
        }

        if ("target" in component) {
            if (component.target.player) {
                this.targets.push(component.target)
            }
        }

        for (let subcomponent of component.subcomponents) {
            this.registerComponent(subcomponent)
        }
    }

    getTargets() {
        return this.targets
    }

    prepare(params) {
        //let {
        //    targets
        //} = params

        //let params = {targets}

        if (!this.check(params)) {
            //TODO: what if check fails
        }

        return () => {
            this.use(params)
        }
    }

    check(params) {
        //TODO: check targets and rest of params
        return true
    }

    use(params) {
        let rootComponent = {
            source: this.source,
            params: params
        }

        //this.activate(this.cost, rootComponent)

        this.components.forEach(component => {
            this.activate(component, rootComponent)
        })
    }

    activate(component, parent) {
        let data = (new ComponentFactory(component, parent)).make()

        //console.log(data)

        data.area.forEach(target => {
            target.affect(data.effect)
        })

        component.subcomponents.forEach(subcomponent => {
            this.activate(subcomponent, data)
        })
    }
}