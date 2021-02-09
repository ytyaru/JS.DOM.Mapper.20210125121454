class DomMapperSelect {
    #mapper
    #element
    async create(path, selected_key=null) {
        this.#mapper = new DomMapper(path);
        await this.#mapper.load();
        console.log(this.#mapper.Keys);
        this.#mapper.map(selected_key);
        return this.#createSelect();
    }
    get Mapper() { return this.#mapper; }
    get Element() { return this.#element; }
    #createSelect() {
        this.#element = document.createElement('select');
        for (let key of this.#mapper.Keys) {
            const option = document.createElement('option');
            option.setAttribute('value', key);
            option.textContent = key;
            this.#element.appendChild(option);
        }
        this.#element.addEventListener('change', (event)=>{
            this.#mapper.map(event.target.value);
        });
        return this.#element;
    }
}

