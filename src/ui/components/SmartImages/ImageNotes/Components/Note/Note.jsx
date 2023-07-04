
import PropTypes from 'prop-types';

import './Note.css';

import { NoteDiv } from '../BaseComponents/NoteDiv';

export const Note = ({xPosition, yPosition, imageNote, setIsActive})=>{


    return(
        <NoteDiv
            xPosition = {xPosition}
            yPosition = {yPosition}
        >
            <div className="note__visualization--div">
                <h3 style={{fontWeight: "bolder", marginBottom:"0.5em"}}><p>{imageNote.noteTitle}</p></h3>
                <p style={{marginBottom:"0.5em"}}>{imageNote.noteText}</p>
                <button type="button" className="btn btn-warning" style={{marginRight:"0.25em"}} onClick={()=>{setIsActive(false)}}>Close</button>
            </div>
        </NoteDiv>
    )
}

Note.propTypes = {
    xPosition: PropTypes.number.isRequired,
    yPosition: PropTypes.number.isRequired,
    imageNote: PropTypes.object.isRequired,
    setIsActive: PropTypes.func.isRequired,
}