import { getObject } from "../../infrastructure/MemoryStorage/GetObject"
import { saveObject } from "../../infrastructure/MemoryStorage/SaveObject";

import { storedImagesInfoKey } from "./init";

export const getStoredImagesKeys = ()=>{

    const storedImagesInfo = getObject(storedImagesInfoKey);

    if (storedImagesInfo === null){
        const storedImagesTemplate = {
            creationDate: new Date().toDateString(),
            lastModificationDate : new Date().toDateString(),
            imagesKeys : []
        }
        saveObject(storedImagesInfoKey, storedImagesTemplate);
        return [];
    }
    
    return storedImagesInfo.imagesKeys;
}