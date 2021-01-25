window.addEventListener('load', async(event) => {
    const mapper = new Mapper('./tsv/map.tsv');
    await mapper.map('和');
    console.log(mapper.Keys);
//    Mapper.map('英');
});
