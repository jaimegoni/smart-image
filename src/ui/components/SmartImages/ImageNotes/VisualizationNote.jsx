
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import { VisualizationSquare, Note } from "./Components";
import { calculateSquareDisplayCoordinates } from '../../../../core/services/RelativePositioningCalculations';

export const VisualizationNote = ({imageData, imageNote, divImageParameters, activeNotesKeys, setActiveNotesKeys})=>{

    const [{ initialX, initialY, finalX, finalY }, setSquareCoordinates] = useState(
        {
            initialX: 0,
            initialY: 0,
            finalX: 1,
            finalY: 1,
        }
    )

    const [isNoteActive, setIsNoteActive] = useState(false);

    const setNoteActive = (isActive)=>{

        setIsNoteActive(isActive);

        if (!(activeNotesKeys.includes(imageNote.noteKey))){
            setActiveNotesKeys([...activeNotesKeys, imageNote.noteKey])
        }
        else{
            setActiveNotesKeys(activeNotesKeys.filter((noteKey)=>(!(noteKey === imageNote.noteKey))));
        }
    }
    
    useEffect(()=>{
        if (activeNotesKeys.includes(imageNote.noteKey)){
            setIsNoteActive(true);
        }
        else{
            setIsNoteActive(false);
        }
    },[activeNotesKeys])

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
                setIsActive = {setNoteActive}
            />
            {
                isNoteActive
                    &&
                <Note
                xPosition = { finalX + 10}
                yPosition = { initialY }
                imageNote = {imageNote}
                setIsActive = {setNoteActive}
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
    ),
    activeNotesKeys: PropTypes.array.isRequired,
    setActiveNotesKeys: PropTypes.func.isRequired
}