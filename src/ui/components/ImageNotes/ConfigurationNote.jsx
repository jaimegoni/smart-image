
import { useState } from 'react';
import PropTypes from 'prop-types'

import { ConfigurationForm, ConfigurationSquare } from "./Components";
import { deleteNote, saveNoteModification } from '../../../core/services/NotesSavingAndModifying';
import { calculateSquareDisplayCoordinates } from '../../../core/services/RelativePositioningCalculations';


export const ConfigurationNote = ({imageData, imageNote, canvasParameters, setImageData})=>{

    const { initialX, initialY, finalX, finalY } = calculateSquareDisplayCoordinates(
        imageData.imageWidth,
        imageData.imageHeight,
        canvasParameters.canvasWidth,
        canvasParameters.canvasHeight,
        canvasParameters.xCanvasOffset,
        canvasParameters.yCanvasOffset,
        imageNote.xNaturalInitial,
        imageNote.yNaturalInitial,
        imageNote.xNaturalFinal,
        imageNote.yNaturalFinal
    )

    const [isNoteActive, setIsNoteActive] = useState(false);

    const onModifyNote = (noteKey, noteTitle, noteText)=>{
        const newImageData = saveNoteModification(
            imageData,
            noteKey,
            noteTitle,
            noteText
        )
        setImageData(newImageData);
        return;
    }

    const onDeleteNote = (noteKey)=>{

        if (confirm("Are you sure you want to delete the note?")){
            const newImageData = deleteNote(
                imageData,
                noteKey
            )
            setImageData(newImageData);
        }
        return;
    }

    return(
        <>
            <ConfigurationSquare
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
                <ConfigurationForm
                xPosition = { finalX + 10}
                yPosition = { initialY }
                imageNote = {imageNote}
                setIsActive = {setIsNoteActive}
                onDeleteNote = {onDeleteNote}
                onModifyNote = {onModifyNote}
            />
            }
        </>
    )
}

ConfigurationNote.propTypes = {
    imageData: PropTypes.object.isRequired,
    imageNote: PropTypes.object.isRequired,
    canvasParameters: PropTypes.shape(
        {
            xCanvasOffset: PropTypes.number.isRequired,
            yCanvasOffset: PropTypes.number.isRequired,
            canvasWidth: PropTypes.number.isRequired,
            canvasHeight: PropTypes.number.isRequired
        }
    ),
    setImageData: PropTypes.func.isRequired
}