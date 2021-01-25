class Mapper {
    #path
    #tsv
    #keys
    constructor(path) {
        this.#path = path;
    }
    async map(selected) {
        if (!this.#tsv) { this.#tsv = await Loader.load(this.#path); this.#keys = this.#createKeys(); }
//        const tsv = await Loader.load(path);
        console.log(selected, this.#tsv);
        for (let record of this.#tsv) {
            console.log(record.query);
            for (let el of document.querySelectorAll(record.query)) {
                if (this.#isProperty(record.target)) {
                    el[record.target] = record[selected];
                    console.log(el, el[record.target]);
                } else if (Mapper.#isMethod(record.target)) {
                    const method = record.target.split(',')[0];
                    const key = record.target.split(',')[1];
                    eval(`el.setAttribute(key, record[selected]);`);
                }
            }
        }
    }
    #createKeys() {
        return this.#keys = Object.keys(this.#tsv).filter(key=> 'query' !== key.toLowerCase() && 'target' !== key.toLowerCase() );
//        return this.#keys = this.#tsv.keys().filter(key=> 'query' !== key.toLowerCase() && 'target' !== key.toLowerCase() );
    }
    get Keys() {
        /*
        if (!this.#keys) {
            console.log(Object.keys(this.#tsv));
            this.#keys = this.#tsv.keys().filter(key=> 'query' !== key.toLowerCase() && 'target' !== key.toLowerCase() );
        }
        */
        return this.#keys;
    }
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

