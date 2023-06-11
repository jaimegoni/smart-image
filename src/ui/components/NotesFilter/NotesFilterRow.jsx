
import PropTypes from 'prop-types';

import './NotesFilter.css';

export const NotesFilterRow = ({note, activeNotesKeys, setActiveNotesKeys})=>{

    const toggleActiveNote = ()=>{
        if(activeNotesKeys.includes(note.noteKey)){
            setActiveNotesKeys(
                activeNotesKeys.filter((noteKey)=>(!(noteKey === note.noteKey)))
            );
        }
        else{
            setActiveNotesKeys([...activeNotesKeys, note.noteKey])
        }
    }

    return(
        <tr key={"tr_" + note.noteKey}>
            <td
                key={`td_${note.noteKey}_${0}`}
            >
                {
                    activeNotesKeys.includes(note.noteKey)
                            ?
                    <input type='checkbox' checked onChange={toggleActiveNote}/>
                            :
                    <input type='checkbox' onChange={toggleActiveNote}/>
                }
            </td>
            <td
                key={`td_${note.noteKey}_${1}`}
            >
                {note.noteTitle}
            </td>
            <td
                key={`td_${note.noteKey}_${2}`}
            >
                {note.noteText}
            </td>
        </tr>
    )
}

NotesFilterRow.propTypes = {
    note : PropTypes.object.isRequired,
    activeNotesKeys : PropTypes.array.isRequired,
    setActiveNotesKeys : PropTypes.func.isRequired
}