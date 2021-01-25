class Mapper {
    static async map(selected) {
        const tsv = await Loader.load();
        console.log(tsv);
        for (let record of tsv) {
            console.log(record.query);
            for (let el of document.querySelectorAll(record.query)) {
                if (Mapper.#isProperty(record.target)) {
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
    static #isProperty(target) {
        const id = target.toLowerCase();
        if ('textcontent' == id) { return true; }
        if ('innertext' == id) { return true; }
        if ('innerhtml' == id) { return true; }
        return false;
    }
    static #isMethod(target) {
        const id = target.toLowerCase();
        if (-1 < id.indexOf('setattribute')) { return true; }
        return false;
    }
}

