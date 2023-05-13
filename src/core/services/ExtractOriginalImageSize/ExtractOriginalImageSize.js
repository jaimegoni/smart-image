export const extractOriginalImageSize = (imageUrl)=>{

    const image = new Image();

    image.src = imageUrl;


    return (
        {
            imageWidth: image.naturalWidth,
            imageHeight: image.naturalHeight
        }
    )

}