
import PropTypes from 'prop-types';

import { saveNote } from '../../../core/services/NotesSavingAndModifying';
import { calculateSquareNaturalCoordinates } from '../../../core/services/RelativePositioningCalculations';

import { CreationSquare, CreationForm } from './Components';


export const CreationNote = ({ initialX, initialY, finalX, finalY, canvasParameters, imageData, setImageData, setShowTemporalSquare })=>{

    const onSaveNote = (noteTitle, noteText)=>{
        const [xNaturalInitial, yNaturalInitial, xNaturalFinal, yNaturalFinal] = calculateSquareNaturalCoordinates(
            initialX,
            initialY,
            finalX,
            finalY,
            canvasParameters.xCanvasOffset,
            canvasParameters.yCanvasOffset,
            canvasParameters.canvasWidth,
            canvasParameters.canvasHeight,
            imageData.imageWidth,
            imageData.imageHeight
        )

        const newImageData = saveNote(
            imageData,
            xNaturalInitial,
            xNaturalFinal,
            yNaturalInitial,
            yNaturalFinal,
            noteTitle,
            noteText
        );
        setImageData(newImageData);
        setShowTemporalSquare(false);
        
    }

    return(
        <>
            <CreationSquare
                xInitial = {initialX}
                yInitial = {initialY}
                xFinal = {finalX}
                yFinal = {finalY}
            />
            <CreationForm
                xPosition = { finalX + 10}
                yPosition = { initialY }
                onSaveNote = { onSaveNote }
                setShowTemporalSquare = { setShowTemporalSquare }
            />
        </>
    )

}

CreationNote.propTypes = {
    initialX: PropTypes.number.isRequired,
    initialY: PropTypes.number.isRequired,
    finalX: PropTypes.number.isRequired,
    finalY: PropTypes.number.isRequired,
    canvasParameters: PropTypes.shape(
        {
            xCanvasOffset: PropTypes.number.isRequired,
            yCanvasOffset: PropTypes.number.isRequired,
            canvasWidth: PropTypes.number.isRequired,
            canvasHeight: PropTypes.number.isRequired
        }
    ),
    imageData: PropTypes.object.isRequired,
    setImageData: PropTypes.func.isRequired,
    setShowTemporalSquare: PropTypes.func.isRequired
}