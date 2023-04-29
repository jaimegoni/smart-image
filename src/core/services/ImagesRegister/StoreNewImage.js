
import PropTypes from 'prop-types'

import { getObject } from "../../infrastructure/MemoryStorage/GetObject";
import { saveObject } from "../../infrastructure/MemoryStorage/SaveObject";
import { getUniqueRandomKey } from "./GetUniqueRandomImageKey";

import { storedImagesInfoKey } from './init';

export const storeNewImage = (image)=>{

    const newImageKey = getUniqueRandomKey();

    let storedImages = getObject(storedImagesInfoKey);
    
    const updatedImagesKeys = [...storedImages.imagesKeys, newImageKey]

    saveObject(
        storedImagesInfoKey,
        {
            ...storedImages,
            lastModificationDate : new Date().toDateString(),
            imagesKeys : updatedImagesKeys
        }
    );

    saveObject(
        newImageKey,
        {
            ...image,
            key : newImageKey
        }
        );

    return newImageKey;

}

storeNewImage.propTypes = {
    image : PropTypes.object.isRequired
}
