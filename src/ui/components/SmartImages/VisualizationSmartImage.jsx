
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import './ConfigurationSmartImage.css';

import { DivImage } from "./DivImage/DivImage";
import { VisualizationNote } from './ImageNotes/VisualizationNote'
import { WidthInput } from "./ImageNotes/Components";
import { SliderSwitch } from "../SliderSwitch/SliderSwitch";

export const VisualizationSmartImage = ({imageData, activeNotesKeys, setActiveNotesKeys})=>{

    const imgContainerId = "smartImagePictureDiv";
    const screenWidthFactor = 0.9;

    const [screenWidth, setScreenWidth] = useState(screen.width);
    const [maxImageDisplayWidth, setMaxImageDisplayWidth] = useState(Math.min(screenWidthFactor*screenWidth, imageData.imageWidth));
    const [displayWidth, setDisplayWidth] = useState(maxImageDisplayWidth);
    const [displayNotes, setDisplayNotes] = useState(true);

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
            <div className="image__actions--div">
                <WidthInput
                    displayWidth = {displayWidth}
                    setDisplayWidth = {setDisplayWidth}
                    maxImageDisplayWidth = {maxImageDisplayWidth}
                />
                <label style={{marginLeft: "1em", marginRight:"0.5em"}}>Display notes when active</label>
                <SliderSwitch
                    active={displayNotes} setActive={setDisplayNotes}
                />
            </div>
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
                            displayNotes = {displayNotes}
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