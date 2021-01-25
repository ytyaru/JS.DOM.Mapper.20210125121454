class Mapper {
    #path
    #tsv
    #keys
    constructor(path) {
        this.#path = path;
    }
    async load() {
        const tsv = await Loader.load(this.#path);
        this.#tsv = tsv.records;
        this.#keys = tsv.keys;
    }
    async map(selected) {
        if (!this.#tsv) { await this.load(); }
        for (let record of this.#tsv) {
            for (let el of document.querySelectorAll(record.query)) {
                if (this.#isProperty(record.target)) {
                    el[record.target] = record[selected];
                } else if (Mapper.#isMethod(record.target)) {
                    const method = record.target.split(',')[0];
                    const key = record.target.split(',')[1];
                    eval(`el.setAttribute(key, record[selected]);`);
                }
            }
        }
    }
    get Keys() { return this.#keys; }
    #isProperty(target) {
        const id = target.toLowerCase();
        if ('textcontent' == id) { return true; }
        if ('innertext' == id) { return true; }
        if ('innerhtml' == id) { return true; }
        return false;
    }
    #isMethod(target) {
        const id = target.toLowerCase();
        if (-1 < id.indexOf('setattribute')) { return true; }
        return false;
    }
}

