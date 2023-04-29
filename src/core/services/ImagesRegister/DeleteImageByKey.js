
import PropTypes from 'prop-types'

import { getObject } from '../../infrastructure/MemoryStorage/GetObject';
import { saveObject } from '../../infrastructure/MemoryStorage/SaveObject';
import { storedImagesInfoKey } from './init';

export const deleteImageByKey = (imageKey) =>{

    const storedImagesInfo = getObject(storedImagesInfoKey);

    localStorage.removeItem(imageKey);

    const imageKeys = storedImagesInfo.imageKeys.filter(key => key !== imageKey);

    saveObject(
            storedImagesInfoKey,
            {
                ...storedImagesInfo,
                lastModificationDate : new Date().toDateString(),
                imageKeys
            }
        );
    
    return;
}

deleteImageByKey.propTypes = {
    imageKey : PropTypes.string.isRequired
}