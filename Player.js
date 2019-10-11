export default class Player {
    constructor({}) {
        this.queue = []

        this.stats = {
            dex: 0,
            con: 0,
            str: 0,
            wil: 0,
            int: 0,
            chr: 0
        }

        this.skills = {
            
        }
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
