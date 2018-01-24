import ColorObject from './ColorObject.js';

class DefaultColorSet {
    constructor() {
        this.counter = 0;
        this.colorSet =  this.getColorSet();
    }

    nextColor() {
        var color = this.colorSet[this.counter % this.colorSet.length];
        this.counter++;

        return color;
    }

    getColorSet() {

        return [
            new ColorObject("#f98f8f", "#E85D5D"),
            new ColorObject("#8fa1f9", "#5a71e2"),
            new ColorObject("#f9e28f", "#e0ba2d"),
            new ColorObject("#80de8c", "#46b954"),
            new ColorObject("#8ff4f9", "#74d9de"),
            new ColorObject("#f98fec", "#dc5fcd"),
            new ColorObject("#f9bb8f", "#ff9d57"),
            new ColorObject("#8fd7f9", "#5dbce8"),
            new ColorObject("#c6f98f", "#91cc52"),
            new ColorObject("#b38ff9", "#9768f3"),
            new ColorObject("#dff98f", "#b0dc29"),
        ];
    }

}

export default DefaultColorSet;
