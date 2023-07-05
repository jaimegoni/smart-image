import { calculateDisplayPositionOnImage } from "./CalculateDisplayPositionOnImage"
import { calculateRelativeWidthAndHeight } from "./CalculateRelativeWidthAndHeight";

export const calculateDisplayRectangleOnImage = (
        imageNaturalWidth,
        imageNaturalHeight,
        imageDisplayWidth,
        imageDisplayHeight,
        imageOffsetX,
        imageOffsetY,
        xInitialNaturalPosition,
        yInitialNaturalPosition,
        xFinalNaturalPosition,
        yFinalNaturalPosition
    )=>{

    const {xDisplayPosition, yDisplayPosition} = calculateDisplayPositionOnImage(imageNaturalWidth, imageNaturalHeight, imageDisplayWidth, imageDisplayHeight, xInitialNaturalPosition, yInitialNaturalPosition);
    const {widthDisplay, heightDisplay} = calculateRelativeWidthAndHeight(
        imageNaturalWidth,
        imageNaturalHeight,
        imageDisplayWidth,
        imageDisplayHeight,
        xFinalNaturalPosition - xInitialNaturalPosition,
        yFinalNaturalPosition - yInitialNaturalPosition
    )

    return(
        {
            xDisplayPosition: imageOffsetX + xDisplayPosition,
            yDisplayPosition: imageOffsetY + yDisplayPosition,
            widthDisplay,
            heightDisplay
        }
    )

}