
import PropTypes from 'prop-types';

export const ActivateAllNotesButton = ({imageNotes, setActiveNotesKeys})=>{

    const activateAllNotes = ()=>{
        setActiveNotesKeys(imageNotes.map((note)=>(note.noteKey)));
    }

    return(
        <button type='button' className='btn btn-primary' style={{marginLeft: "1em"}} onClick={()=>{activateAllNotes()}}>Activate all notes</button>
    )
}

ActivateAllNotesButton.propTypes = {
    imageNotes: PropTypes.array.isRequired,
    setActiveNotesKeys: PropTypes.func.isRequired
}