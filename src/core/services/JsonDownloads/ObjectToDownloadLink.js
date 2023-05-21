
export const objectToDownloadLink = (object) =>{
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
    return dataStr;
}