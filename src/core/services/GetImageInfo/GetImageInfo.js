export const getImageInfo = (imageUrl)=>{

    const image = new Image();

    let imageWidth = 0;
    let imageHeight = 0;

    /*image.onLoad(()=>{
        imageWidth= image.naturalWidth;
        imageHeight= image.naturalHeight;
    });*/

    image.src = imageUrl;

    return (
        {
            imageWidth: image.naturalWidth,
            imageHeight: image.naturalHeight
        }
    )

}