import { useState } from 'react';
import PropTypes from 'prop-types';

import './NotesFilter.css';

import { LargeModalDialog, ModalBody, ModalFooter } from '../../Modal';
import { Table } from '../../Table/Table';
import { NotesFilterRow } from './NotesFilterRow';
import { ActivateAllNotesButton } from './ActivateAllNotesButton';
import { DeactivateAllNotesButton } from './DeactivateAllNotesButton';


export const NotesFilter = ({imageNotes, activeNotesKeys, setActiveNotesKeys})=>{

    const [isModalActive, setIsModalActive] = useState(false);

    const createNoteRow = (note) =>{
        return(
            <NotesFilterRow
                key={note.noteKey}
                note={note}
                activeNotesKeys={activeNotesKeys}
                setActiveNotesKeys={setActiveNotesKeys}
            />
        )
    }

    return(
        <>
            <div className='filter__button--div'>
                <button type='button' onClick={()=>{setIsModalActive(true)}} className='btn btn-secondary'>Filter notes</button>
            </div>
            {
                isModalActive
                    &&
                <LargeModalDialog
                    setIsModalActive={setIsModalActive}
                    modalTitle='Filter notes'
                    
                >
                    <>
                        <ModalBody>
                            <>
                                <div className='activation__buttons--div'>
                                    <ActivateAllNotesButton imageNotes = {imageNotes} setActiveNotesKeys = {setActiveNotesKeys} />
                                    <DeactivateAllNotesButton setActiveNotesKeys={setActiveNotesKeys} />
                                </div>
                                <Table
                                    tableLabels= {["Select", "Title", "Text"]}
                                    tableHeaders={["noteKey", "noteTitle", "noteText"]}
                                    tableContent= {imageNotes}
                                    createRowCallback = {createNoteRow}
                                />
                            </>
                        </ModalBody>
                        <ModalFooter
                            setIsModalActive={setIsModalActive}
                        />
                    </>
                </LargeModalDialog>
            }
        </>
    )
}

NotesFilter.propTypes = {
    imageNotes : PropTypes.array.isRequired,
    activeNotesKeys : PropTypes.array.isRequired,
    setActiveNotesKeys : PropTypes.func.isRequired
}
