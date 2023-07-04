import { useState } from 'react';
import PropTypes from 'prop-types';

import './NoteForms.css';

import { NoteDiv } from '../BaseComponents/NoteDiv';

export const ConfigurationForm = ({xPosition, yPosition, imageNote, setIsActive, onDeleteNote, onModifyNote})=>{
    
    const [noteTitle, setNoteTitle] = useState(imageNote.noteTitle);
    const [noteText, setNoteText] = useState(imageNote.noteText);

    return(
        <NoteDiv
            xPosition = {xPosition}
            yPosition = {yPosition}
        >
            <input type="text" placeholder="Note title" value={noteTitle} onChange={(evt)=>{setNoteTitle(evt.target.value)}}/>
            <textarea className="note__text--area" placeholder="Note text" value={noteText} onChange={(evt)=>{setNoteText(evt.target.value)}}></textarea>
            <div className="note__actions--div">
                <button type="button" className="btn btn-warning" style={{marginRight:"0.25em"}} onClick={()=>{setIsActive(false)}}>Close</button>
                <button type="button" className="btn btn-danger" style={{marginRight:"0.25em"}} onClick={()=>{onDeleteNote(imageNote.noteKey)}}>Delete</button>
                <button type="button" className="btn btn-success" onClick={()=>{onModifyNote(imageNote.noteKey, noteTitle, noteText);}}>Save</button>
            </div>
        </NoteDiv>
    )
}

ConfigurationForm.propTypes = {
    xPosition: PropTypes.number.isRequired,
    yPosition: PropTypes.number.isRequired,
    imageNote: PropTypes.object.isRequired,
    setIsActive: PropTypes.func.isRequired,
    onDeleteNote: PropTypes.func.isRequired,
    onModifyNote: PropTypes.func.isRequired
}