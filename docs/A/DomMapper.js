class DomMapper {
    #path
    #tsv
    #keys
    constructor(path) {
        this.#path = path;
    }
    async load() {
        const tsv = await TsvLoader.load(this.#path);
        this.#tsv = tsv.records;
        this.#keys = tsv.keys;
    }
    async map(selected=null) {
        if (!this.#tsv) { await this.load(); }
        if (!selected) { selected = this.#keys[0]; }
        for (let record of this.#tsv) {
            for (let el of document.querySelectorAll(record.query)) {
                if (this.#isProperty(record.target)) {
                    el[record.target] = record[selected];
//                    const code = `el.${record.target} = "${record[selected]}";`;
//                    console.log(code, record[selected]);
//                    eval(code);
                } else if (this.#isMethod(record.target)) {
                    const method = record.target.split(',')[0];
                    const key = record.target.split(',')[1];
                    const code = `el.setAttribute(key, record[selected]);`;
                    console.log(code, key, record[selected]);
                    eval(code);
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

