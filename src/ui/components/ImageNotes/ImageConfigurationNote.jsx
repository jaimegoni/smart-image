import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import './ImageNotes.css';

export const ImageConfigurationNote = (
    {
        imageNote,
        onModifyNote,
        onDeleteNote,
        positioningParams,
        calculateDisplaySquare
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
    const [noteTitle, setNoteTitle] = useState(imageNote.noteTitle);
    const [noteText, setNoteText] = useState(imageNote.noteText);
    const [{initialX, initialY, finalX, finalY} , setAnchorCoordinates] = useState( defaultCoordinates );
    const [anchorSquareStyle, setAnchorSquareStyle ] = useState(defaultAnchorStyle);
    
    useState(()=>{
        const [iX, iY, fX, fY] = calculateDisplaySquare(
            imageNote.xNaturalInitial,
            imageNote.yNaturalInitial,
            imageNote.xNaturalFinal,
            imageNote.yNaturalFinal

        );
        setAnchorCoordinates(
            {
                initialX: iX,
                initialY: iY,
                finalX: fX,
                finalY: fY
            }
        );
    },[positioningParams.offsetX, positioningParams.offsetY])

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
                title={noteTitle}
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
                        <button type="button" className="btn btn-warning" style={{marginRight:"0.25em"}} onClick={()=>{setIsActive(false)}}>Close</button>
                        <button type="button" className="btn btn-danger" style={{marginRight:"0.25em"}} onClick={()=>{onDeleteNote(imageNote.noteKey)}}>Delete</button>
                        <button type="button" className="btn btn-success" onClick={()=>{
                                onModifyNote(imageNote.noteKey, noteTitle, noteText);
                            }}>
                            Save
                        </button>
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
    positioningParams: PropTypes.object.isRequired,
    calculateDisplaySquare : PropTypes.func.isRequired
}