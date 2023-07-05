
import PropTypes from 'prop-types';

import { saveNote } from '../../../../core/services/NotesSavingAndModifying';
import { calculateSquareNaturalCoordinates } from '../../../../core/services/RelativePositioningCalculations';

import { CreationSquare, CreationForm } from './Components';


export const CreationNote = ({ initialX, initialY, finalX, finalY, divImageParameters, imageData, setImageData, setShowCreationNote })=>{

    const onSaveNote = (noteTitle, noteText)=>{

        if (!(noteTitle === "")){
            const [xNaturalInitial, yNaturalInitial, xNaturalFinal, yNaturalFinal] = calculateSquareNaturalCoordinates(
                initialX,
                initialY,
                finalX,
                finalY,
                divImageParameters.xOffset,
                divImageParameters.yOffset,
                divImageParameters.width,
                divImageParameters.height,
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
        }

        setShowCreationNote(false);
        
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
                setShowCreationNote = { setShowCreationNote }
            />
        </>
    )

}

CreationNote.propTypes = {
    initialX: PropTypes.number.isRequired,
    initialY: PropTypes.number.isRequired,
    finalX: PropTypes.number.isRequired,
    finalY: PropTypes.number.isRequired,
    divImageParameters: PropTypes.shape(
        {
            xOffset: PropTypes.number.isRequired,
            yOffset: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        }
    ),
    imageData: PropTypes.object.isRequired,
    setImageData: PropTypes.func.isRequired,
    setShowCreationNote: PropTypes.func.isRequired
}