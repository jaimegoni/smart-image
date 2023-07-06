
export const calculateRelativeWidthAndHeight = ( naturalImageWidthPixels, naturalImageHeightPixels, displayImageWidthPixels, displayImageHeightPixels, naturalSquareWidth, naturalSquareHeight)=>{

    const displaySquareWidth = Math.round(naturalSquareWidth * displayImageWidthPixels / naturalImageWidthPixels)
    const displaySquareHeight = Math.round(naturalSquareHeight * displayImageHeightPixels / naturalImageHeightPixels)

    return(
        {
            displaySquareWidth,
            displaySquareHeight
        }
    )

}