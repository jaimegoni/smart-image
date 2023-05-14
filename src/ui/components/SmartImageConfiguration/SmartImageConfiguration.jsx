import { useState, useEffect } from "react";
import { useMouseClickPosition } from "../../../core/hooks/useMouseClickPosition";

import "./SmartImageConfiguration.css"

import { calculateImageDisplayDimensions } from "../../../core/services/RelativePositioningCalculations/CalculateImageDisplayDimensions";

export const SmartImageConfiguration = ({imageData})=>{
    
    const imgContainerId = "smartImageImgConfig";

    const resetDraggedSquareStyle = {
        "display": "none",
        "left": "0px",
        "top": "0px",
        "width": "0px",
        "height": "0px"
    }

    const [screenWidth, setScreenWidth] = useState(screen.width);
    const [{imageDisplayWidth, imageDisplayHeight} , setDisplayDimensions] = useState(
        calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight)
    );
    const [draggedSquareStyle, setDraggedSquareStyle] = useState(resetDraggedSquareStyle);

    const { xInitial, yInitial, xFinal, yFinal, xCurrent, yCurrent } = useMouseClickPosition(imgContainerId);
    
    const onResizeActions = ()=>{
        setScreenWidth(screen.width);
    }

    useEffect(()=>{
            setDisplayDimensions(calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight));
        }
        ,[screenWidth])

    useEffect(
        ()=>{
            window.addEventListener('resize', onResizeActions);
            return(window.removeEventListener("beforeunload", onResizeActions));
        }
        ,[])
    
    useEffect(()=>{
        if (!(xCurrent === 0) && !(yCurrent === 0)){
            if(!(xInitial === xCurrent) && !(yInitial === yCurrent)){
                setDraggedSquareStyle(
                    {
                        "display": "block",
                        "left": xInitial + "px",
                        "top": yInitial + "px",
                        "minWidth": (xCurrent - xInitial) > 0 ? (xCurrent - xInitial) + "px" : "2px",
                        "minHeight": (yCurrent - yInitial) > 0 ? (yCurrent - yInitial) + "px" : "2px"
                    }
                );
            }
        }
        else{
            setDraggedSquareStyle(resetDraggedSquareStyle);
        }
    }
    ,[ xCurrent, yCurrent])

    
    useEffect(()=>{

        if (!(xFinal === 0) && !(yFinal === 0)){
            if ((xFinal > xInitial) && (yFinal > yInitial)){
                console.log(`xInitial: ${xInitial}, yInitial: ${yInitial}, xFinal: ${xFinal}, yFinal: ${yFinal}`)
            }
        }
    }
    ,[xFinal, yFinal])

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
                draggedSquareStyle.display === "block"
                    &&
                <div
                    className="dragged__square--div"
                    style={draggedSquareStyle}
                ></div>
            }

        </div>
    )

}