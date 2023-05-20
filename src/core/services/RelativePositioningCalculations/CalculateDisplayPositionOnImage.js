
export const calculateDisplayPositionOnImage = (
    imageNaturalWidth,
    imageNaturalHeight,
    imageDisplayWidth,
    imageDisplayHeight,
    imageOffsetX,
    imageOffsetY,
    xNaturalPosition,
    yNaturalPosition) =>{

    const xDisplayPosition = Math.round(xNaturalPosition * imageDisplayWidth / imageNaturalWidth);
    const yDisplayPosition = Math.round(yNaturalPosition * imageDisplayHeight / imageNaturalHeight);

    console.log(
        {
            xDisplayPosition,
            yDisplayPosition
        }
    )

    return(
        {
            xDisplayPosition: imageOffsetX + xDisplayPosition,
            yDisplayPosition: imageOffsetY + yDisplayPosition
        }
    )

}