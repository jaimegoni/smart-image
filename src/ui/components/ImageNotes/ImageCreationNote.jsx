
import PropTypes from 'prop-types';

import "./ImageNotes.css";

export const ImageCreationNote = ({xPosition, yPosition, setShowTemporalSquare, setNoteTitle, setNoteText, onSaveNote})=>{

    return(
        <div
            className="creation__note--div"
            style={
                {
                    left: xPosition,
                    top: yPosition
                }
            }
        >
            <input type="text" placeholder="Note title" onChange={(evt)=>{setNoteTitle(evt.target.value)}}/>
            <textarea className="note__text--area" placeholder="Note text" onChange={(evt)=>{setNoteText(evt.target.value)}}></textarea>
            <div className="note__actions--div">
                <button type="button" className="btn btn-warning" onClick={()=>{setShowTemporalSquare(false)}}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={onSaveNote}>Save</button>
            </div>
        </div>
    )
}

ImageCreationNote.propTypes = {
    xPosition : PropTypes.number.isRequired,
    yPosition : PropTypes.number.isRequired,
    setShowTemporalSquare : PropTypes.func.isRequired,
    setNoteTitle : PropTypes.func.isRequired,
    setNoteText : PropTypes.func.isRequired,
    onSaveNote : PropTypes.func.isRequired
}