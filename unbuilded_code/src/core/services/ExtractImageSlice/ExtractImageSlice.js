
export const extractImageSlice = async(imageSrc, initialX, initialY, width, height)=>{

    let hasFinishedSlicing = false;
    let slicedImage = "";

    const cnvs = document.createElement('canvas');
    const ctx = cnvs.getContext('2d');

    const img = new Image()

    img.onload = ()=>{
        ctx.drawImage(img,initialX, initialY, width, height, 0, 0, width, height);
        slicedImage = cnvs.toDataURL('image/jpeg');
        cnvs.remove();
        hasFinishedSlicing = true;
    }

    img.src = imageSrc;

    return new Promise ((resolve, reject)=>{

        setTimeout(
            ()=>{
                hasFinishedSlicing === true ? resolve(slicedImage) : reject("");
            }
            , 500);
    })
}