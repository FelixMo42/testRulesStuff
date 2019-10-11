import Vec2 from "./Vec2.js"

class Node {
    setPlayer(player) {
        player.setNode(this)
        this.player = player
    }
}

export default class Map {
    constructor({width, height}) {
        this.width = width
        this.height = height

        this.nodes = []
        for (var x = 0; x < width; x++) {
            this.nodes[x] = []
            for (var y = 0; y < height; y++) {
                this.nodes[x][y] = new Node({
                    position: new Vec2(x, y),
                    map: this
                })
            }
        }
    }

    getWidth() {
        return this.width
    }

    getHeight() {
        return this.height
    }

    isValid({x, y}) {
        return x >= 0 && y >= 0 && x < this.getWidth() && y < this.getHeight()
    }

    get({x, y}) {
        if (this.isValid({x: x, y: y})) {
            return this.nodes[x][y]
        } else {
            console.error("invalid x, y")
        }
    }
}