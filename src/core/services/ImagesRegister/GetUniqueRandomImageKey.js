
import { getRandomKey } from "../RandomKey/GetRandomKey";
import { getStoredImagesKeys } from "./GetStoredImagesKeys";

export const getUniqueRandomImageKey = ()=>{

    const storedImagesKeys = getStoredImagesKeys();

    if (storedImagesKeys.length > 0){

        let key = getRandomKey();

        while (storedImagesKeys.includes(key)){
            key = getRandomKey();
        }
        return key;
    }
    else{
        return getRandomKey();
    }

}