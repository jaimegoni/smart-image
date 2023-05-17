import { rewriteStoredImage } from "../ImagesRegister/RewriteStoredImage";

export const deleteNote = (imageData, noteKey)=>{
    
    const newImageData = {
        ...imageData,
        imageNotes : imageData.imageNotes.filter((note)=>(!(note.noteKey === noteKey))),
    }

    rewriteStoredImage(imageData.key, newImageData);

    return newImageData;
}