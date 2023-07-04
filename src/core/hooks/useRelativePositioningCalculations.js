
import { calculateNaturalPoint } from "../services/RelativePositioningCalculations/CalculateNaturalPoint"

import { calculateDisplayPositionOnImage } from "../services/RelativePositioningCalculations/CalculateDisplayPositionOnImage"

export const useRelativePositioningCalculations = (containerOffsetX, containerOffsetY, imageDisplayWidth, imageDisplayHeight, imageData)=>{
    
    const offsetX= containerOffsetX
    const offsetY= containerOffsetY
    const displayWidth= imageDisplayWidth
    const displayHeight= imageDisplayHeight
    const realWidth= imageData.imageWidth
    const realHeight= imageData.imageHeight

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