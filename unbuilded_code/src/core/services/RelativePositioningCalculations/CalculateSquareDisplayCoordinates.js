
import { calculateDisplayPositionOnImage } from "./CalculateDisplayPositionOnImage";

export const calculateSquareDisplayCoordinates = (
    imageNaturalWidth,
    imageNaturalHeight,
    imageDisplayWidth,
    imageDisplayHeight,
    imageOffsetX,
    imageOffsetY,
    xNaturalInitial,
    yNaturalInitial,
    xNaturalFinal,
    yNaturalFinal
)=>{

    let squareCoordinates = {
        initialX : 0,
        initialY : 0,
        finalX : 0,
        finalY : 0
    }

    const initialPoints = calculateDisplayPositionOnImage(
        imageNaturalWidth,
        imageNaturalHeight,
        imageDisplayWidth,
        imageDisplayHeight,
        imageOffsetX,
        imageOffsetY,
        xNaturalInitial,
        yNaturalInitial
    );

    squareCoordinates = {
        ...squareCoordinates,
        initialX : initialPoints.xDisplayPosition,
        initialY : initialPoints.yDisplayPosition
    };
    
    const finalPoints = calculateDisplayPositionOnImage(
        imageNaturalWidth,
        imageNaturalHeight,
        imageDisplayWidth,
        imageDisplayHeight,
        imageOffsetX,
        imageOffsetY,
        xNaturalFinal,
        yNaturalFinal
    );

    
    squareCoordinates = {
        ...squareCoordinates,
        finalX : finalPoints.xDisplayPosition,
        finalY : finalPoints.yDisplayPosition
    };

    return(
        squareCoordinates
    )
}