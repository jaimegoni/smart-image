
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './ImageNotes.css';

import { calculateSquareDisplayCoordinates } from '../../../core/services/RelativePositioningCalculations/CalculateSquareDisplayCoordinates';

export const ImageVisualizationNote = (
    {
        imageNote,
        activeNotes,
        setActiveNotes,
        imageNaturalWidth,
        imageNaturalHeight,
        imageDisplayWidth,
        imageDisplayHeight,
        imageOffsetX,
        imageOffsetY,
        
    }
    )=>{

    const defaultCoordinates = {
        initialX: 0,
        initialY: 0,
        finalX: 0,
        finalY: 0
    };

    const defaultAnchorStyle = {
            "display": "none",
            "left": "0px",
            "top": "0px",
            "minWidth": "1px",
            "minHeight": "1px"
    };

    const [isActive, setIsActive ] = useState(false);
    const [{initialX, initialY, finalX, finalY} , setAnchorCoordinates] = useState( defaultCoordinates );
    const [anchorSquareStyle, setAnchorSquareStyle ] = useState(defaultAnchorStyle);

    const toggleActivation = ()=>{
        if(isActive){
            setActiveNotes(activeNotes.filter((noteKey)=>(!(noteKey === imageNote.noteKey))));
        }
        else{
            setActiveNotes([...activeNotes, imageNote.noteKey]);

        }
    }
    
    useEffect(()=>{
        if(activeNotes.includes(imageNote.noteKey)){
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    }
    ,[activeNotes])

    useEffect(
        ()=>{
            if(!(imageOffsetX === 0) && !(imageOffsetY === 0)){
                const squareCoordinates = calculateSquareDisplayCoordinates(
                    imageNaturalWidth,
                    imageNaturalHeight,
                    imageDisplayWidth,
                    imageDisplayHeight,
                    imageOffsetX,
                    imageOffsetY,
                    imageNote.xNaturalInitial,
                    imageNote.yNaturalInitial,
                    imageNote.xNaturalFinal,
                    imageNote.yNaturalFinal
                );
                setAnchorCoordinates(squareCoordinates);
            }
        }
        ,[imageOffsetX, imageOffsetY]);
    
    useEffect(
        ()=>{
            setAnchorSquareStyle(
                {
                    "display": "block",
                    "left": initialX + "px",
                    "top": initialY + "px",
                    "minWidth": (finalX - initialX)  + "px",
                    "minHeight": (finalY - initialY) + "px"
                })
        }
        ,[initialX, initialY, finalX, finalY]);
    
        return(
            <div
                id={imageNote.noteKey}
                className= { isActive ? "active__square--div": "visualization__square--div"}
                style={anchorSquareStyle}
                onClick={()=>{toggleActivation()}}
                title={imageNote.noteTitle + " | " + imageNote.noteText}
            >
            </div>
        )
}

ImageVisualizationNote.propTypes = {
    imageNote: PropTypes.object.isRequired,
    activeNotes: PropTypes.array.isRequired,
    setActiveNotes: PropTypes.func.isRequired,
    imageNaturalWidth: PropTypes.number.isRequired,
    imageNaturalHeight: PropTypes.number.isRequired,
    imageDisplayWidth: PropTypes.number.isRequired,
    imageDisplayHeight: PropTypes.number.isRequired,
    imageOffsetX: PropTypes.number.isRequired,
    imageOffsetY: PropTypes.number.isRequired,
}