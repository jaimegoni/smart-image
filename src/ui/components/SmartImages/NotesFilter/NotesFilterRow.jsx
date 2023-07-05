
import PropTypes from 'prop-types';

import './NotesFilter.css';

import { Tr, Td } from '../../Table';

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
        <Tr key={"tr_" + note.noteKey}>
            <Td
                key={`td_${note.noteKey}_${0}`}
            >
                {
                    activeNotesKeys.includes(note.noteKey)
                            ?
                    <input type='checkbox' checked onChange={toggleActiveNote}/>
                            :
                    <input type='checkbox' onChange={toggleActiveNote}/>
                }
            </Td>
            <Td
                key={`td_${note.noteKey}_${1}`}
            >
                {note.noteTitle}
            </Td>
            <Td
                key={`td_${note.noteKey}_${2}`}
            >
                {note.noteText}
            </Td>
        </Tr>
    )
}

NotesFilterRow.propTypes = {
    note : PropTypes.object.isRequired,
    activeNotesKeys : PropTypes.array.isRequired,
    setActiveNotesKeys : PropTypes.func.isRequired
}