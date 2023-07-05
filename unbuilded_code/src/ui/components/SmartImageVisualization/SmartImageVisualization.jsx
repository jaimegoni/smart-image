
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import '../ImageNotes/ImageNotes.css';

import { calculateImageDisplayDimensions } from "../../../core/services/RelativePositioningCalculations/CalculateImageDisplayDimensions";
import { ImageVisualizationNote } from "../ImageNotes/ImageVisualizationNote";

export const SmartImageVisualization = ({imageData, activeNotes, setActiveNotes})=>{
    
    const imgContainerId = "smartImageImg";

    const [screenWidth, setScreenWidth] = useState(screen.width);
    const [{offsetX, offsetY}, setContainerOffset] = useState({offsetX:0, offsetY:0});
    const [{imageDisplayWidth, imageDisplayHeight} , setDisplayDimensions] = useState(
        calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight)
    );

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
    
    // useEffect(()=>{console.log(activeNotes)}, [activeNotes])

    useEffect(()=>{
            setDisplayDimensions(calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight));
        }
    ,[screenWidth])

    useEffect(
        ()=>{
            window.addEventListener('resize', onResizeActions);
            calculateContainerOffset();
            return(
                ()=>{
                    window.removeEventListener("resize", onResizeActions);
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
        {
            imageData.imageNotes.map((note)=>(
                <ImageVisualizationNote
                    key={note.noteKey}
                    imageNote = {note}
                    activeNotes = {activeNotes}
                    setActiveNotes = {setActiveNotes}
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

SmartImageVisualization.propTypes = {
    imageData : PropTypes.object.isRequired,
    activeNotes : PropTypes.array.isRequired,
    setActiveNotes : PropTypes.func.isRequired
}