class Manager {
    constructor(colorset) {
        this.colorset = colorset;
        this.items = new Map();
    }

    getColor(item) {
        if(this.items.has(item)) {
            return this.items.get(item);
        }else {
            var color = this.colorset.nextColor();
            this.items.set(item, color);

            return color;
        }
    }
}

export default Manager;
