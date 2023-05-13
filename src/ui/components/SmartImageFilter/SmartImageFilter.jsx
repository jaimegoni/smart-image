import { useState } from "react";

import "./SmartImageFilter.css"

export const SmartImageFilter = ({imageNotes})=>{

    const [displayNotes, setDisplayNotes] = useState(imageNotes);

    const filterNotes = (event)=>{
        const filterValue = event.target.value;

        setDisplayNotes(imageNotes.filter((note)=>(note.text.includes(filterValue))));
    }

    return(
        <div className="filter__container--div">
            <input className="image__filter--input" type="text" placeholder="Filter notes" onChange={filterNotes}/>
            <div className="image__notes--div">
                {
                    !(displayNotes.length === 0)
                                ?
                    displayNotes.map(
                        (note)=>(<p>{note.text}</p>))
                                :
                    <p style={{color:"red"}}>No notes available</p>
                }
            </div>
        </div>
    );
}