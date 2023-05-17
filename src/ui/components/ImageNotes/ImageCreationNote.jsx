
import "./ImageNotes.css"

export const ImageCreationNote = ({xPosition, yPosition, setNoteTitle, setNoteText, onSaveNote})=>{

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
            <textarea placeholder="Note text" onChange={(evt)=>{setNoteText(evt.target.value)}}></textarea>
            <button type="button" className="btn btn-success" onClick={onSaveNote}>Save</button>
        </div>
    )
}