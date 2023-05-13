
export const calculateDisplayPositionOnImage = (imageNaturalWidth, imageNaturalHeight, imageDisplayWidth, imageDisplayHeight, xNaturalPosition, yNaturalPosition) =>{

    const xDisplayPosition = Math.round(xNaturalPosition * imageDisplayWidth / imageNaturalWidth);
    const yDisplayPosition = Math.round(yNaturalPosition * imageDisplayHeight / imageNaturalHeight);

    return(
        {
            xDisplayPosition,
            yDisplayPosition
        }
    )

}