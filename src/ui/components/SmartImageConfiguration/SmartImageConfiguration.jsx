import { useState, useEffect } from "react";
import { useMouseClickPosition } from "../../../core/hooks/useMouseClickPosition";
import { PropTypes } from 'prop-types';

import "./SmartImageConfiguration.css"

import { calculateImageDisplayDimensions } from "../../../core/services/RelativePositioningCalculations/CalculateImageDisplayDimensions";
import { DraggingSquare } from "../ImageNotes/DraggingSquare";
import { TemporalSquare } from "../ImageNotes/TemporalSquare";
import { ImageCreationNote } from "../ImageNotes/ImageCreationNote";
import { saveNote } from "../../../core/services/NotesSavingAndModifying/SaveNote";
import { saveNoteModification } from "../../../core/services/NotesSavingAndModifying/SaveNoteModification";
import { deleteNote } from "../../../core/services/NotesSavingAndModifying/DeleteNote";
import { ImageConfigurationNote } from "../ImageNotes/ImageConfigurationNote";

export const SmartImageConfiguration = ({imageData, setImageData})=>{
    
    const imgContainerId = "smartImageImgConfig";


    const [screenWidth, setScreenWidth] = useState(screen.width);
    const [{offsetX, offsetY}, setContainerOffset] = useState({offsetX:0, offsetY:0});
    const [{imageDisplayWidth, imageDisplayHeight} , setDisplayDimensions] = useState(
        calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight)
    );
    const [showTemporalSquare, setShowTemporalSquare] = useState(false);
    
    const [noteTilte, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");

    const { xInitial, yInitial, xFinal, yFinal, xCurrent, yCurrent } = useMouseClickPosition(imgContainerId);
    
    const calculateContainerOffset = ()=>{
        const imgContainerDiv = document.getElementById(imgContainerId);
        setContainerOffset(
            {
                offsetX: imgContainerDiv.offsetLeft,
                offsetY: imgContainerDiv.offsetTop
            }
        );
    }
    
    const onResizeActions = ()=>{
        setScreenWidth(screen.width);
        calculateContainerOffset();
    }

    const onSaveNote = ()=>{
        const newImageData = saveNote(
            imageData,
            xInitial,
            yInitial,
            xFinal,
            yFinal,
            offsetX,
            offsetY,
            imageDisplayWidth,
            imageDisplayHeight,
            noteTilte,
            noteText
        );
        setImageData(newImageData);
        setShowTemporalSquare(false);
        
    }

    const onModifyNote = (noteKey, noteTitle, noteText)=>{
        const newImageData = saveNoteModification(
            imageData,
            noteKey,
            noteTitle,
            noteText
        )
        setImageData(newImageData);
        return;
    }

    const onDeleteNote = (noteKey)=>{

        if (confirm("Are you sure you want to delete the note?")){
            const newImageData = deleteNote(
                imageData,
                noteKey
            )
            setImageData(newImageData);
        }
        return;
    }

    useEffect(()=>{
            setDisplayDimensions(calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight));
        }
        ,[screenWidth])
    
    useEffect(()=>{

        if (!(xFinal === 0) && !(yFinal === 0)){
            if ((xFinal > xInitial) && (yFinal > yInitial)){
                setShowTemporalSquare(true);
            }
        }
        else{
            setShowTemporalSquare(false);
        }
    }
    ,[xFinal, yFinal])

    useEffect(
        ()=>{
            window.addEventListener('resize', onResizeActions);
            calculateContainerOffset();
            return(
                ()=>{
                    window.removeEventListener("beforeunload", onResizeActions);
                }
                );
        }
    ,[])
    
    return(
        <div
            id = {imgContainerId}
            className="smart__image--img"
            style={
                {
                    backgroundImage : `url(${imageData.b64image})`,
                    backgroundSize : "contain",
                    backgroundRepeat : "no-repeat",
                    width : `${imageDisplayWidth}px`,
                    height : `${imageDisplayHeight}px`
                }
            }
        >
        <DraggingSquare
            xInitial = {xInitial}
            yInitial = {yInitial}
            xCurrent = {xCurrent}
            yCurrent = {yCurrent}
        />
        {
            showTemporalSquare
                &&
            <>
                <TemporalSquare
                    xInitial = {xInitial}
                    yInitial = {yInitial}
                    xFinal = {xFinal}
                    yFinal = {yFinal}
                />
                <ImageCreationNote
                    xPosition = { xFinal + 5}
                    yPosition = { yInitial }
                    setShowTemporalSquare = {setShowTemporalSquare}
                    setNoteTitle = {setNoteTitle}
                    setNoteText = {setNoteText}
                    onSaveNote = {onSaveNote}
                />
            </>
        }
        {
            imageData.imageNotes.map((note)=>(
                <ImageConfigurationNote
                    key={note.noteKey}
                    imageNote = {note}
                    onModifyNote = {onModifyNote}
                    onDeleteNote = {onDeleteNote}
                    imageNaturalWidth = {imageData.imageWidth}
                    imageNaturalHeight = {imageData.imageHeight}
                    imageDisplayWidth = {imageDisplayWidth}
                    imageDisplayHeight = {imageDisplayHeight}
                    imageOffsetX = {offsetX}
                    imageOffsetY = {offsetY}
                />
            ))
        }
        </div>
    )

}

SmartImageConfiguration.propTypes = {
    imageData : PropTypes.object.isRequired,
    setImageData: PropTypes.func.isRequired
}