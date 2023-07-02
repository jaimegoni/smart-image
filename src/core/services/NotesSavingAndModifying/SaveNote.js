import { rewriteStoredImage } from "../ImagesRegister/RewriteStoredImage";
import { createUniqueKey } from "../RandomKey/CreateUniqueKey";
import { getRandomKey } from "../RandomKey/GetRandomKey";

export const saveNote = (
    imageData,
    xNaturalInitial,
    xNaturalFinal,
    yNaturalInitial,
    yNaturalFinal,
    noteTitle,
    noteText,
    )=>{
    
    let noteKey = "";
    const noteStorageKeyword = "noteKey_";

    if (xNaturalFinal > imageData.imageWidth){
        xNaturalFinal = imageData.imageWidth;
    }
    
    if (yNaturalFinal > imageData.imageHeight){
        yNaturalFinal = imageData.imageHeight;
    }
    
    if (imageData.imageNotes.length < 1){
        noteKey = noteStorageKeyword + getRandomKey(10);
    }
    else{
        const existingNotesKeys = imageData.imageNotes.map((note)=>(note.noteKey));
        noteKey = createUniqueKey(existingNotesKeys, noteStorageKeyword);
    }

    const newNote = {
        noteKey,
        noteTitle,
        noteText,
        xNaturalInitial,
        xNaturalFinal,
        yNaturalInitial,
        yNaturalFinal
    }

    const newImageData = {
        ...imageData,
        imageNotes : [
            ...imageData.imageNotes,
            newNote
        ]
    }

    rewriteStoredImage(imageData.key, newImageData);

    return newImageData;
}
