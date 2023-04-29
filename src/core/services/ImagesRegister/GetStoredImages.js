import { getStoredImagesKeys } from "./GetStoredImagesKeys";
import { getObject } from "../../infrastructure/MemoryStorage/GetObject"

export const getStoredImages = ()=>{

    const imagesKeys = getStoredImagesKeys();

    if (imagesKeys.length > 0){
        const storedImages = imagesKeys.map((key) =>(getObject(key)));
        return storedImages;
    }
    
    return [];

}