import { calculateDisplayPositionOnImage } from "../CalculateDisplayPositionOnImage/CalculateDisplayPositionOnImage"
import { calculateRelativeWidthAndHeight } from "../CalculateRelativeWidthAndHeight/CalculateRelativeWidthAndHeight";

export const calculateDisplayRectangleOnImage = (
        imageNaturalWidth,
        imageNaturalHeight,
        imageDisplayWidth,
        imageDisplayHeight,
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
            xDisplayPosition,
            yDisplayPosition,
            widthDisplay,
            heightDisplay
        }
    )

}