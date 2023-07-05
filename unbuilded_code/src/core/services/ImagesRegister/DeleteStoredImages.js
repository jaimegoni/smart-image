import { getStoredImagesKeys } from "./GetStoredImagesKeys";
import { storedImagesInfoKey  } from "./init";

import { getObject } from "../../infrastructure/MemoryStorage/GetObject";
import { saveObject } from "../../infrastructure/MemoryStorage/SaveObject";

export const deleteStoredImages = ()=>{

    const storedImagesInfo = getObject(storedImagesInfoKey);

    const storedImagesKeys = getStoredImagesKeys();

    storedImagesKeys.forEach((imageKey) => {
        localStorage.removeItem(imageKey);
    });

    saveObject(
            storedImagesInfoKey,
            {
                ...storedImagesInfo,
                lastModificationDate : new Date().toDateString(),
                imagesKeys: []
            }
        );
    return;
}