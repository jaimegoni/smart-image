
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import "./SmartImageAnchor.css";

import { calculateDisplayRectangleOnImage } from '../../../core/services/RelativePositioningCalculations/CalculateDisplayRectangleOnImage';

export const SmartImageRectangleAnchor = (
    {
        imageNote,
        containerOffsetX,
        containerOffsetY,
        containerWidth,
        containerHeight,
        imageNaturalWidth,
        imageNaturalHeight,
        mode
    }
    )=>{

    if (!(mode === "creation") || !(mode === "configuration") || !(mode === "visualization")){
        throw new Error("Error at SmartImageRectangleAnchor.jsx: unknown anchor mode: " + mode)
    }

    const [anchorActive, setAnchorActive] = useState(false);

    const [{xDisplayPosition, yDisplayPosition, widthDisplay, heightDisplay}, setDisplayParameters] = useState(
        calculateDisplayRectangleOnImage(
            imageNaturalWidth,
            imageNaturalHeight,
            containerWidth,
            containerHeight,
            containerOffsetX,
            containerOffsetY,
            imageNote.xInitialNaturalPosition,
            imageNote.yInitialNaturalPosition,
            imageNote.xFinalNaturalPosition,
            imageNote.yFinalNaturalPosition
        )
    )

    const setAnchorClass = ()=>{

        if(anchorActive){
            return "active__note--div";
        }
        if(mode === "creation"){
            return "active__note--div";
        }
        if (mode === "configuration"){
            return "configuration__note--div";
        }
        if (mode === "visualization"){
            return ""
        }
    }

    useEffect(()=>{
        setDisplayParameters(
            calculateDisplayRectangleOnImage(
                imageNaturalWidth,
                imageNaturalHeight,
                containerWidth,
                containerHeight,
                containerOffsetX,
                containerOffsetY,
                imageNote.xInitialNaturalPosition,
                imageNote.yInitialNaturalPosition,
                imageNote.xFinalNaturalPosition,
                imageNote.yFinalNaturalPosition
            )
        )
    }
    , [containerOffsetX, containerOffsetY, containerWidth,containerHeight])

    return(
        <a href="#" className="note__square--a" onClick={()=>{setAnchorActive(!anchorActive)}}>
            <div
                className={`note__square--div ${setAnchorClass()}`}
                style={
                    {
                        left: xDisplayPosition,
                        top: yDisplayPosition,
                        minWidth: widthDisplay,
                        minHeight: heightDisplay
                    }
                }
            />
        </a>
    )

}

SmartImageRectangleAnchor.propTypes = {
    imageNote: PropTypes.object.isRequired,
    containerOffsetX: PropTypes.number.isRequired,
    containerOffsetY: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    imageNaturalWidth: PropTypes.number.isRequired,
    imageNaturalHeight: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired
}