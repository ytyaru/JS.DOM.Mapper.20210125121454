class Loader {
    static async load(path) { // './tsv/map.tsv'
        return await this.#getTsv(path);
    }
    static #getTsv(path) {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open("get", path, true);
            req.onload = () => {
                if (req.readyState === 4 && req.status === 200) {
                    resolve(Loader.#convertTsvToObject(req.responseText));
                } else {
                    reject(new Error(req.statusText));
                }
            };
            req.onerror = () => {
                reject(new Error(req.statusText));
            };
            req.send(null);
        });
    }
    static #convertTsvToArray(tsv){
        var result = [];
        var lines = tsv.split("\n");
        for (let line of lines) {
            result.push(line.split('\t'));
        }
        return result;
    }
    static #convertTsvToObject(tsv){
        const records = [];
        const lines = tsv.split("\n");
//        const keys = lines.shift().split('\t');
        const keys = lines.shift().split('\t');
        for (let o of Loader.#getRecords(keys, lines)) {
            records.push(o);
        }
        /*
        for (let line of lines) {
            const record = line.split('\t');
            if (3 > record.length) { continue; }
            const o = {};
            o.query = record[0];
            o.target = record[1];
            for (let i=2; i<record.length; i++) {
                o[keys[i]] = record[i];
            }
            records.push(o);
        }
        */
        return {keys: keys.slice(2), records: records};
    }
    static * #getRecords(keys, lines){
        for (let line of lines) {
            const record = line.split('\t');
            if (3 > record.length) { continue; }
            const o = {};
            o.query = record[0];
            o.target = record[1];
            for (let i=2; i<record.length; i++) {
                o[keys[i]] = record[i];
            }
            yield o;
//            records.push(o);
        }
    }
}

