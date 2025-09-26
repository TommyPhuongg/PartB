class Utils {
    constructor(template) {
        this.template = template;
    }

    getDate(name) {
        const now = new Date();
        const message = this.template.replace("%1", name) + " " + now.toString();

        return `<p style="color: blue;">${message}</p>`;
    }
}

module.exports = Utils;