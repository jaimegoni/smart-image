
export const readJson = (file)=>{

    let isFileReady = false;
    let jsonData = {};


    const onReaderLoad = (event)=>{
        jsonData = JSON.parse(event.target.result);
        isFileReady = true
    }

    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(file);

    return new Promise ((resolve, reject)=>{

        setTimeout(
            ()=>{
                isFileReady === true ? resolve(jsonData) : reject({});
            }
            , 500);
    })
}