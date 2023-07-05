
import PropTypes from 'prop-types';

export const DeactivateAllNotesButton = ({setActiveNotesKeys}) =>{
    

    return(
        <button type='button' className='btn btn-secondary'  style={{marginLeft: "1em"}} onClick={()=>{setActiveNotesKeys([])}}>Deactivate all notes</button>
    )
}

DeactivateAllNotesButton.propTypes = {
    setActiveNotesKeys: PropTypes.func.isRequired
}