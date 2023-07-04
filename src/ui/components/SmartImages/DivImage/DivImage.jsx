
import PropTypes from 'prop-types';

import './DivImage.css';

export const DivImage = ({imgContainerId, imageData, displayWidth, displayHeight, children})=>{

    return(
        <div
            id = {imgContainerId}
            className="smart__image--img"
            style={
                {
                    backgroundImage : `url(${imageData.b64image})`,
                    backgroundSize : "contain",
                    backgroundRepeat : "no-repeat",
                    width : `${displayWidth}px`,
                    height : `${displayHeight}px`
                }
            }
        >
        {
            children
        }
        </div>
    )
}

DivImage.propTypes = {
    imgContainerId: PropTypes.string.isRequired,
    imageData: PropTypes.object.isRequired,
    displayWidth: PropTypes.number.isRequired,
    displayHeight: PropTypes.number.isRequired,
    children: PropTypes.any
}