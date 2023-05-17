import { useState, useEffect } from "react";
import { useMouseClickPosition } from "../../../core/hooks/useMouseClickPosition";

import "./SmartImageConfiguration.css"

import { calculateImageDisplayDimensions } from "../../../core/services/RelativePositioningCalculations/CalculateImageDisplayDimensions";
import { DraggingSquare } from "./DraggingSquare";
import { TemporalSquare } from "./TemporalSquare";
import { ImageCreationNote } from "../ImageNotes/ImageCreationNote";
import { saveNote } from "../../../core/services/NotesSavingAndModifying/SaveNote";

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
        console.log(noteTilte);
        console.log(noteText);
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
                    setNoteTitle = {setNoteTitle}
                    setNoteText = {setNoteText}
                    onSaveNote = {onSaveNote}
                />
            </>
        }

        </div>
    )

}