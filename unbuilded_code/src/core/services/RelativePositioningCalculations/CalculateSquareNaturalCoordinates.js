
import { calculateNaturalPoint } from "./CalculateNaturalPoint"

export const calculateSquareNaturalCoordinates = (
    xDisplayInitial,
    yDisplayInitial,
    xDisplayFinal,
    yDisplayFinal,
    xContainerOffset,
    yContainerOffset,
    containerWidth,
    containerHeight,
    imageWidth,
    imageHeight
    )=>
    {
    
    const xNaturalInitial = calculateNaturalPoint(xDisplayInitial, xContainerOffset, containerWidth, imageWidth);
    const yNaturalInitial = calculateNaturalPoint(yDisplayInitial, yContainerOffset, containerHeight, imageHeight);
    const xNaturalFinal = calculateNaturalPoint(xDisplayFinal, xContainerOffset, containerWidth, imageWidth);
    const yNaturalFinal = calculateNaturalPoint(yDisplayFinal, yContainerOffset, containerHeight, imageHeight);
    
    return [xNaturalInitial, yNaturalInitial, xNaturalFinal, yNaturalFinal]
}