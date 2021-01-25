window.addEventListener('load', async(event) => {
    const mapper = new Mapper('./tsv/map.tsv');
    await mapper.load();
    console.log(mapper.Keys);
    mapper.map('和');
//    mapper.map('英');
    createSelect();
    function createSelect() {
        const select = document.createElement('select');
        for (let key of mapper.Keys) {
            const option = document.createElement('option');
            option.setAttribute('value', key);
            option.textContent = key;
            select.appendChild(option);
        }
//        document.body.appendChild(select);
        document.body.insertBefore(select, document.body.children[0]);
        select.addEventListener('change', (event)=>{
            mapper.map(event.target.value);
        });
    }
});
