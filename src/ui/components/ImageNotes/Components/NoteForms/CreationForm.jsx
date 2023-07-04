
import PropTypes from 'prop-types';

import './NoteForms.css';

import { NoteDiv } from '../BaseComponents/NoteDiv';
import { useState } from 'react';

export const CreationForm = ({xPosition, yPosition, onSaveNote, setShowTemporalSquare})=>{

    const titleInputId = "titleInput";

    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");

    return(
        <NoteDiv
            xPosition = {xPosition}
            yPosition = {yPosition}
        >
            <input id = {titleInputId} type="text" placeholder="Note title" onChange={(evt)=>{setNoteTitle(evt.target.value)}}/>
            <textarea className="note__text--area" placeholder="Note text" onChange={(evt)=>{setNoteText(evt.target.value)}}></textarea>
            <div className="note__actions--div">
                <button type="button" className="btn btn-warning" onClick={()=>{setShowTemporalSquare(false)}}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={()=>{onSaveNote(noteTitle, noteText)}}>Save</button>
            </div>
        </NoteDiv>
    )
}

CreationForm.propTypes = {
    xPosition: PropTypes.number.isRequired,
    yPosition: PropTypes.number.isRequired,
    onSaveNote: PropTypes.func.isRequired,
    setShowTemporalSquare: PropTypes.func.isRequired
}