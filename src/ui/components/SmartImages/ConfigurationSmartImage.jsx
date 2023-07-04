
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { useMouseClickPosition } from "../../../core/hooks/useMouseClickPosition"
import { DivImage } from "./DivImage/DivImage";
import { DraggingSquare } from "./ImageNotes/Components";
import { CreationNote } from "./ImageNotes/CreationNote";
import { ConfigurationNote } from "./ImageNotes/ConfigurationNote";

export const ConfigurationSmartImage = ({imageData, setImageData})=>{

    const imgContainerId = "smartImagePictureDiv";

    const { xInitial, yInitial, xFinal, yFinal, xCurrent, yCurrent} = useMouseClickPosition( imgContainerId , onMouseDownCallback, onMouseUpCallback);
    const [divImageParameters, setDivImageParameters] = useState(
        {
            xOffset: 0,
            yOffset: 0,
            width: imageData.imageWidth,
            height: imageData.imageHeight
        }
    )

    const [showCreationNote, setShowCreationNote] = useState(false);
    const [showDraggingSquare, setShowDraggingSquare] = useState(false);

    const onMouseDownCallback = ()=>{setShowDraggingSquare(true); setShowCreationNote(false)};
    const onMouseUpCallback = ()=>{setShowDraggingSquare(false); setShowCreationNote(true)};

    const calculateContainerOffset = ()=>{
        const imgContainerDiv = document.getElementById(imgContainerId);
        setDivImageParameters(
            {  
                ...divImageParameters,
                xOffset: imgContainerDiv.offsetLeft,
                yOffset: imgContainerDiv.offsetTop
            }
        );
    }

    useEffect(
        ()=>{
            calculateContainerOffset();
            window.addEventListener('resize', calculateContainerOffset);
            return(
                ()=>{
                    window.removeEventListener("resize", calculateContainerOffset);
                }
                );
        }
    ,[])

    return(
        <DivImage
            imgContainerId = {imgContainerId}
            imageData = {imageData}
            displayWidth = {imageData.imageWidth}
            displayHeight = {imageData.imageHeight}
        >
            {
                showDraggingSquare
                    &&
                <DraggingSquare
                    xInitial = {xInitial}
                    yInitial = {yInitial}
                    xCurrent = {xCurrent}
                    yCurrent = {yCurrent}
                />
            }
            {
                showCreationNote
                    &&
                <CreationNote
                    initialX = {xInitial}
                    initialY = {yInitial}
                    finalX = {xFinal}
                    finalY = {yFinal}
                    divImageParameters = {divImageParameters}
                    imageData = {imageData}
                    setImageData = {setImageData}
                    setShowCreationNote = {setShowCreationNote}
                />
            }
            {
                imageData.imageNotes.map((note)=>
                (
                    <ConfigurationNote
                        key={note.noteKey}
                        imageData = {imageData}
                        imageNote = {note}
                        divImageParameters = {divImageParameters}
                        setImageData = {setImageData}
                    />
                )
                )
            }
        </DivImage>
    )
}

ConfigurationSmartImage.propTypes = {
    imageData: PropTypes.object.isRequired,
    setImageData: PropTypes.func.isRequired
}