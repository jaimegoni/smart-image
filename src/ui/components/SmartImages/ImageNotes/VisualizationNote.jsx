
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import { VisualizationSquare, Note } from "./Components";
import { calculateSquareDisplayCoordinates } from '../../../../core/services/RelativePositioningCalculations';

export const VisualizationNote = ({imageData, imageNote, divImageParameters})=>{

    const [{ initialX, initialY, finalX, finalY }, setSquareCoordinates] = useState(
        {
            initialX: 0,
            initialY: 0,
            finalX: 1,
            finalY: 1,
        }
    )

    const [isNoteActive, setIsNoteActive] = useState(false);

    useEffect(()=>{
        setSquareCoordinates(
            calculateSquareDisplayCoordinates(
                imageData.imageWidth,
                imageData.imageHeight,
                divImageParameters.width,
                divImageParameters.height,
                divImageParameters.xOffset,
                divImageParameters.yOffset,
                imageNote.xNaturalInitial,
                imageNote.yNaturalInitial,
                imageNote.xNaturalFinal,
                imageNote.yNaturalFinal
            )
        );
    },[divImageParameters])

    return(
        <>
            <VisualizationSquare
                xInitial = { initialX }
                yInitial = { initialY }
                xFinal = { finalX }
                yFinal = { finalY }
                isActive = {isNoteActive}
                setIsActive = {setIsNoteActive}
            />
            {
                isNoteActive
                    &&
                <Note
                xPosition = { finalX + 10}
                yPosition = { initialY }
                imageNote = {imageNote}
                setIsActive = {setIsNoteActive}
            />
            }
        </>
    )
}

VisualizationNote.propTypes = {
    imageData: PropTypes.object.isRequired,
    imageNote: PropTypes.object.isRequired,
    divImageParameters: PropTypes.shape(
        {
            xOffset: PropTypes.number.isRequired,
            yOffset: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        }
    )
}