
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import './ConfigurationSmartImage.css';

import { useMouseClickPosition } from "../../../core/hooks/useMouseClickPosition"
import { DivImage } from "./DivImage/DivImage";
import { DraggingSquare } from "./ImageNotes/Components";
import { CreationNote } from "./ImageNotes/CreationNote";
import { ConfigurationNote } from "./ImageNotes/ConfigurationNote";
import { WidthInput } from "./ImageNotes/Components";
import { SliderSwitch } from "../SliderSwitch/SliderSwitch";

export const ConfigurationSmartImage = ({imageData, setImageData})=>{

    const imgContainerId = "smartImagePictureDiv";
    const screenWidthFactor = 0.9;

    const [screenWidth, setScreenWidth] = useState(screen.width);
    const [maxImageDisplayWidth, setMaxImageDisplayWidth] = useState(Math.min(screenWidthFactor*screenWidth, imageData.imageWidth));
    const [displayWidth, setDisplayWidth] = useState(maxImageDisplayWidth);

    const [allowTextRecon, setAllowTextRecon] = useState(true);
    const [showCreationNote, setShowCreationNote] = useState(false);
    const [divImageParameters, setDivImageParameters] = useState(
        {
            xOffset: 0,
            yOffset: 0,
            width: maxImageDisplayWidth,
            height: Math.round(maxImageDisplayWidth*imageData.imageHeight / imageData.imageWidth)
        }
    )

    const onMouseDownCallback = ()=>{
        setShowCreationNote(false);
    }

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

    const { xInitial, yInitial, xFinal, yFinal, xCurrent, yCurrent} = useMouseClickPosition(imgContainerId, onMouseDownCallback);

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
    
    useEffect(()=>{

        if (!(xFinal === 0) && !(yFinal === 0)){
            if ((xFinal > xInitial) && (yFinal > yInitial)){
                setShowCreationNote(true);
            }
        }
        else{
            setShowCreationNote(false);
        }
    }
    ,[xFinal, yFinal])

    return(
        <>
        
        <div className="image__actions--div">
            <WidthInput
                    displayWidth = {displayWidth}
                    setDisplayWidth = {setDisplayWidth}
                    maxImageDisplayWidth = {maxImageDisplayWidth}
            />
            <label style={{marginLeft: "1em", marginRight:"0.5em"}}>Allow text recognition</label>
            <SliderSwitch active={allowTextRecon} setActive={setAllowTextRecon}/>
        </div>
        <DivImage
            imgContainerId = {imgContainerId}
            imageData = {imageData}
            displayWidth = {divImageParameters.width}
            displayHeight = {divImageParameters.height}
        >
            {
                ((xCurrent > 0) && (yCurrent > 0))
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
                    allowTextRecon = {allowTextRecon}
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
        </>
    )
}

ConfigurationSmartImage.propTypes = {
    imageData: PropTypes.object.isRequired,
    setImageData: PropTypes.func.isRequired
}