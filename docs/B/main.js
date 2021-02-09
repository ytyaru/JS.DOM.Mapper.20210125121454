window.addEventListener('load', async(event) => {
    const select = new DomMapperSelect();
    document.body.insertBefore(await select.create('./tsv/map.tsv'), document.body.children[0]);
    console.log(select.Mapper, select.Element);
});
