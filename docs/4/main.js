window.addEventListener('load', async(event) => {
    const mapper = new Mapper('./tsv/map.tsv');
    await mapper.load();
    console.log(mapper.Keys);
    mapper.map('和');
//    mapper.map('英');
});
