
import { useEffect, useState } from "react"
import { calculateNaturalPoint } from "../services/RelativePositioningCalculations/CalculateNaturalPoint"

import { calculateDisplayPositionOnImage } from "../services/RelativePositioningCalculations/CalculateDisplayPositionOnImage"

export const useRelativePositioningCalculations = (containerOffsetX, containerOffsetY, imageDisplayWidth, imageDisplayHeight, imageData)=>{

    const [{ offsetX, offsetY, displayWidth, displayHeight, realWidth, realHeight}, setPositioningParams] = useState({
        offsetX: containerOffsetX,
        offsetY: containerOffsetY,
        displayWidth: imageDisplayWidth,
        displayHeight: imageDisplayHeight,
        realWidth: imageData.imageWidth,
        realHeight: imageData.imageHeight,
    })

    useEffect(()=>{
        setPositioningParams(
            {
                offsetX: containerOffsetX,
                offsetY:containerOffsetY,
                displayWidth,
                displayHeight,
                realWidth,
                realHeight
            }
        )
    },[containerOffsetX, containerOffsetY])

    useEffect(()=>{
        setPositioningParams(
            {
                displayWidth: imageDisplayWidth,
                displayHeight: imageDisplayHeight,
            }
        )
    },[imageDisplayWidth, imageDisplayHeight])

    const calculateNaturalXYPoint = (xClickedPosition, yClickedPosition)=>{
        const xPos = calculateNaturalPoint(xClickedPosition, offsetX, displayWidth, realWidth);
        const yPos = calculateNaturalPoint(yClickedPosition, offsetY, displayHeight, realHeight);

        return [xPos, yPos]

    }

    const calculateDisplaySquare = (xNaturalInitial, yNaturalInitial, xNaturalFinal, yNaturalFinal)=>{

        const {xDisplayPosition : initialX, yDisplayPosition: initialY} = calculateDisplayPositionOnImage(
            realWidth,
            realHeight,
            displayWidth,
            displayHeight,
            offsetX,
            offsetY,
            xNaturalInitial,
            yNaturalInitial,
        )

        const {xDisplayPosition : finalX, yDisplayPosition: finalY} = calculateDisplayPositionOnImage(
            realWidth,
            realHeight,
            displayWidth,
            displayHeight,
            offsetX,
            offsetY,
            xNaturalFinal,
            yNaturalFinal
        )
        
        return [initialX, initialY, finalX, finalY];
    }

    return [{ offsetX, offsetY, displayWidth, displayHeight, realWidth, realHeight}, calculateNaturalXYPoint, calculateDisplaySquare];

}