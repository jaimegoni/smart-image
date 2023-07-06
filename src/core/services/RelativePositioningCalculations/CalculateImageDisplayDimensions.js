
export const calculateImageDisplayDimensions = (screenWidth, imageNaturalWidth, imageNaturalHeight)=>{

    const imageDisplayWidth = Math.round(screenWidth - 2*48);
    const imageDisplayHeight = Math.round(imageDisplayWidth * imageNaturalHeight / imageNaturalWidth);

    return(
        {
            imageDisplayWidth,
            imageDisplayHeight
        }
    )

}