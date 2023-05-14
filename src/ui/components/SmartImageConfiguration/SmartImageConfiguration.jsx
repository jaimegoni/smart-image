import { useState, useEffect } from "react";
import { useMouseClickPosition } from "../../../core/hooks/useMouseClickPosition";

import "./SmartImageConfiguration.css"

import { calculateImageDisplayDimensions } from "../../../core/services/RelativePositioningCalculations/CalculateImageDisplayDimensions";
import { DraggingSquare } from "./DraggingSquare";
import { TemporalSquare } from "./TemporalSquare";

export const SmartImageConfiguration = ({imageData})=>{
    
    const imgContainerId = "smartImageImgConfig";


    const [screenWidth, setScreenWidth] = useState(screen.width);
    const [{offsetX, offsetY}, setContainerOffset] = useState({offsetX:0, offsetY:0});
    const [{imageDisplayWidth, imageDisplayHeight} , setDisplayDimensions] = useState(
        calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight)
    );
    const [showTemporalSquare, setShowTemporalSquare] = useState(false);

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
    }
    ,[xFinal, yFinal])

    useEffect(
        ()=>{
            window.addEventListener('resize', onResizeActions);
            calculateContainerOffset();
            return(window.removeEventListener("beforeunload", onResizeActions));
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
            <TemporalSquare
                xInitial = {xInitial}
                yInitial = {yInitial}
                xFinal = {xFinal}
                yFinal = {yFinal}
            />
        }

        </div>
    )

}