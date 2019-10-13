import Vec2 from "./Vec2.js"
import Tile from "./Tile.js"

class Node {
    constructor({world, position, tile}) {
        this.world = world
        this.position = position
        this.tile = new Tile({
            ...tile,
            node: this
        })
    }

    setPlayer(player) {
        player.setNode(this)
        this.player = player
    }
}

export default class World {
    constructor({width, height, baseTile}) {
        this.width = width
        this.height = height

        this.nodes = []
        for (var x = 0; x < width; x++) {
            this.nodes[x] = []
            for (var y = 0; y < height; y++) {
                this.nodes[x][y] = new Node({
                    position: new Vec2(x, y),
                    tile: baseTile || {},
                    world: this
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

    getNode({x, y}) {
        return this.nodes[x][y]
    }
}