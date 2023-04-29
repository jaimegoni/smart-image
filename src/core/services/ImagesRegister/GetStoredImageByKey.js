import { getObject } from "../../infrastructure/MemoryStorage/GetObject"

import PropTypes from 'prop-types'

export const getStoredImageByKey = (imageKey)=>{

    return getObject(imageKey);

}

getStoredImageByKey.propTypes = {
    imageKey : PropTypes.string.isRequired
}