import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import './ImageNotes.css';

import { calculateDisplayPositionOnImage } from "../../../core/services/RelativePositioningCalculations/CalculateDisplayPositionOnImage";

export const ImageConfigurationNote = (
    {
        imageNote,
        onModifyNote,
        onDeleteNote,
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
    }

    const defaultAnchorStyle = {
            "display": "none",
            "left": "0px",
            "top": "0px",
            "minWidth": "1px",
            "minHeight": "1px"
        }
    

    const [isActive, setIsActive ] = useState(false);
    const [noteTitle, setNoteTitle] = useState(imageNote.noteTitle);
    const [noteText, setNoteText] = useState(imageNote.noteText);
    const [{initialX, initialY, finalX, finalY} , setAnchorCoordinates] = useState( defaultCoordinates )
    const [anchorSquareStyle, setAnchorSquareStyle ] = useState(defaultAnchorStyle)
    
    const calculateSquareCoordinates = ()=>{

        let squareCoordinates = {
            initialX : 0,
            initialY : 0,
            finalX : 0,
            finalY : 0
        }

        const initialPoints = calculateDisplayPositionOnImage(
            imageNaturalWidth,
            imageNaturalHeight,
            imageDisplayWidth,
            imageDisplayHeight,
            imageOffsetX,
            imageOffsetY,
            imageNote.xNaturalInitial,
            imageNote.yNaturalInitial
        );

        squareCoordinates = {
            ...squareCoordinates,
            initialX : initialPoints.xDisplayPosition,
            initialY : initialPoints.yDisplayPosition
        };
        
        const finalPoints = calculateDisplayPositionOnImage(
            imageNaturalWidth,
            imageNaturalHeight,
            imageDisplayWidth,
            imageDisplayHeight,
            imageOffsetX,
            imageOffsetY,
            imageNote.xNaturalFinal,
            imageNote.yNaturalFinal
        );

        
        squareCoordinates = {
            ...squareCoordinates,
            finalX : finalPoints.xDisplayPosition,
            finalY : finalPoints.yDisplayPosition
        };

        return(
            squareCoordinates
        )
    }


    useEffect(
        ()=>{
            if(!(imageOffsetX === 0) && !(imageOffsetY === 0)){
                const squareCoordinates = calculateSquareCoordinates();
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
        <>
            <div
                id={imageNote.noteKey}
                className= { isActive ? "active__square--div": "configuration__square--div"}
                style={anchorSquareStyle}
                onClick={()=>{setIsActive(!isActive)}}
            >
            </div>
            {
                isActive
                    &&
                <div
                    className="creation__note--div"
                    style={
                        {
                            left: `${finalX + 4}px`,
                            top: `${initialY}px`
                        }
                    }
                >
                    <input type="text" placeholder="Note title" value={noteTitle} onChange={(evt)=>{setNoteTitle(evt.target.value)}}/>
                    <textarea className="note__text--area" placeholder="Note text" value={noteText} onChange={(evt)=>{setNoteText(evt.target.value)}}></textarea>
                    <div className="note__actions--div">
                        <button type="button" className="btn btn-warning" onClick={()=>{setIsActive(false)}}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={()=>{onDeleteNote(imageNote.noteKey)}}>Delete</button>
                        <button type="button" className="btn btn-success" onClick={()=>{onModifyNote(imageNote.noteKey, noteTitle, noteText)}}>Save</button>
                    </div>
                </div>
                
            }
        </>
    )
}

ImageConfigurationNote.propTypes = {
    imageNote : PropTypes.object.isRequired,
    onModifyNote : PropTypes.func.isRequired,
    onDeleteNote : PropTypes.func.isRequired,
    imageNaturalWidth : PropTypes.number.isRequired,
    imageNaturalHeight : PropTypes.number.isRequired,
    imageDisplayWidth : PropTypes.number.isRequired,
    imageDisplayHeight : PropTypes.number.isRequired,
    imageOffsetX : PropTypes.number.isRequired,
    imageOffsetY : PropTypes.number.isRequired
}