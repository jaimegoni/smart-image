
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { DivImage } from "./DivImage/DivImage";
import { VisualizationNote } from './ImageNotes/VisualizationNote'
import { WidthInput } from "./ImageNotes/Components";

export const VisualizationSmartImage = ({imageData, activeNotesKeys, setActiveNotesKeys})=>{

    const imgContainerId = "smartImagePictureDiv";
    const screenWidthFactor = 0.9;

    const [screenWidth, setScreenWidth] = useState(screen.width);
    const [maxImageDisplayWidth, setMaxImageDisplayWidth] = useState(Math.min(screenWidthFactor*screenWidth, imageData.imageWidth));
    const [displayWidth, setDisplayWidth] = useState(maxImageDisplayWidth);

    const [divImageParameters, setDivImageParameters] = useState(
        {
            xOffset: 0,
            yOffset: 0,
            width: maxImageDisplayWidth,
            height: Math.round(maxImageDisplayWidth*imageData.imageHeight / imageData.imageWidth)
        }
    )
    
    const onResizeActions = ()=>{
        setScreenWidth(screen.width);
        setMaxImageDisplayWidth(Math.min(screenWidthFactor*screenWidth, imageData.imageWidth));
        calculateContainerOffset();
    }

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
            window.addEventListener('resize', onResizeActions);
            return(
                ()=>{
                    window.removeEventListener("resize", onResizeActions);
                }
                );
        }
    ,[])

    useEffect(()=>{

        if(divImageParameters.xOffset > 0){
            setDivImageParameters({
                ...divImageParameters,
                width: displayWidth,
                height: Math.round(displayWidth*imageData.imageHeight / imageData.imageWidth)
            })
        }
    },[displayWidth])

    return(
        <>
            <WidthInput
                displayWidth = {displayWidth}
                setDisplayWidth = {setDisplayWidth}
                maxImageDisplayWidth = {maxImageDisplayWidth}
            />
            <DivImage
                imgContainerId = {imgContainerId}
                imageData = {imageData}
                displayWidth = {divImageParameters.width}
                displayHeight = {divImageParameters.height}
            >
                {
                    imageData.imageNotes.map((note)=>
                    (
                        <VisualizationNote
                            key={note.noteKey}
                            imageData = {imageData}
                            imageNote = {note}
                            divImageParameters = {divImageParameters}
                            activeNotesKeys = {activeNotesKeys}
                            setActiveNotesKeys = {setActiveNotesKeys}
                        />
                    )
                    )
                }
            </DivImage>
        </>
    )
}

VisualizationSmartImage.propTypes = {
    imageData: PropTypes.object.isRequired,
    activeNotesKeys: PropTypes.array.isRequired,
    setActiveNotesKeys: PropTypes.func.isRequired
}