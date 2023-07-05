
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './NoteForms.css';

import { NoteDiv } from '../BaseComponents/NoteDiv';

export const CreationForm = ({xPosition, yPosition, onSaveNote, setShowCreationNote, isRecognizingTitle, recognizedTitle})=>{

    const titleInputId = "titleInput";

    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");

    useEffect(()=>{
        if (!isRecognizingTitle){
            if(!(recognizedTitle === "")){
                setNoteTitle(recognizedTitle);
            }
        }
    },[isRecognizingTitle])

    return(
        <NoteDiv
            xPosition = {xPosition}
            yPosition = {yPosition}
        >
            {
                isRecognizingTitle
                    ?
                <p>Recognizing...</p>
                    :
                <input id = {titleInputId} type="text" placeholder="Note title" value={noteTitle} onChange={(evt)=>{setNoteTitle(evt.target.value)}}/>
            }
            
            <textarea className="note__text--area" placeholder="Note text" onChange={(evt)=>{setNoteText(evt.target.value)}}></textarea>
            <div className="note__actions--div">
                <button type="button" className="btn btn-warning" onClick={()=>{setShowCreationNote(false)}}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={()=>{onSaveNote(noteTitle, noteText)}}>Save</button>
            </div>
        </NoteDiv>
    )
}

CreationForm.propTypes = {
    xPosition: PropTypes.number.isRequired,
    yPosition: PropTypes.number.isRequired,
    onSaveNote: PropTypes.func.isRequired,
    setShowCreationNote: PropTypes.func.isRequired,
    isRecognizingTitle: PropTypes.bool.isRequired,
    recognizedTitle: PropTypes.string.isRequired
}