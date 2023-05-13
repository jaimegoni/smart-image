
import { useState, useEffect } from "react";

import { calculateImageDisplayDimensions } from "../../../core/services/RelativePositioningCalculations/CalculateImageDisplayDimensions";

export const SmartImageVisualization = ({imageData})=>{
    
    const imgContainerId = "smartImageImg";

    const [screenWidth, setScreenWidth] = useState(screen.width);

    const [{imageDisplayWidth, imageDisplayHeight} , setDisplayDimensions] = useState(
        calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight)
    );

    
    const onResizeActions = ()=>{
        setScreenWidth(screen.width);
    }
    
    useEffect(()=>{
            setDisplayDimensions(calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight));
        }
        ,[screenWidth]
    )

    useEffect(
        ()=>{
            window.addEventListener('resize', onResizeActions);

            return(window.removeEventListener("beforeunload", onResizeActions));
        }
        ,[]
    )

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

        </div>
    )

}