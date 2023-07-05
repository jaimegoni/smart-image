
import { useEffect } from 'react';

import PropTypes from 'prop-types';

import { saveNote } from '../../../../core/services/NotesSavingAndModifying';
import { calculateSquareNaturalCoordinates } from '../../../../core/services/RelativePositioningCalculations';

import { CreationSquare, CreationForm } from './Components';

import { useRecognizeImage } from '../../../../core/hooks/useRecognizeImage';
import { extractImageSlice } from '../../../../core/services/ExtractImageSlice/ExtractImageSlice';



export const CreationNote = ({ initialX, initialY, finalX, finalY, divImageParameters, imageData, setImageData, setShowCreationNote, allowTextRecon })=>{

    const [{isRecognizing, hasError, recognizedText}, setFile] = useRecognizeImage();

    const calculateNaturalCoordinates = ()=>{
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
        return [xNaturalInitial, yNaturalInitial, xNaturalFinal, yNaturalFinal]
    }

    const onSaveNote = (noteTitle, noteText)=>{

        if (!(noteTitle === "")){
            const [xNaturalInitial, yNaturalInitial, xNaturalFinal, yNaturalFinal] = calculateNaturalCoordinates();
    
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

    useEffect(()=>{
        if(allowTextRecon){
            const [xNaturalInitial, yNaturalInitial, xNaturalFinal, yNaturalFinal] = calculateNaturalCoordinates();

            extractImageSlice(imageData.b64image, xNaturalInitial, yNaturalInitial, (xNaturalFinal-xNaturalInitial), (yNaturalFinal-yNaturalInitial))
                .then((imgSrc)=>{setFile(imgSrc)});
            
        }
    },[]);

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
                isRecognizingTitle = {isRecognizing}
                recognizedTitle = {recognizedText}
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
    setShowCreationNote: PropTypes.func.isRequired,
    allowTextRecon: PropTypes.bool.isRequired
}