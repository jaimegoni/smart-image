
import "./ImageNotes.css"

export const ImageCreationNote = ({xPosition, yPosition})=>{

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
            <input type="text" placeholder="Write note"/>
            <button type="button" className="btn btn-success">Save</button>
        </div>
    )
}