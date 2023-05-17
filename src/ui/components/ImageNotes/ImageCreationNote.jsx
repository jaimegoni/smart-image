
import "./ImageNotes.css"

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
                <button type="button" className="btn btn-danger" onClick={()=>{setShowTemporalSquare(false)}}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={onSaveNote}>Save</button>
            </div>
        </div>
    )
}