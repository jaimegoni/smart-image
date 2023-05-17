import { rewriteStoredImage } from "../ImagesRegister/RewriteStoredImage";
import { createUniqueKey } from "../RandomKey/CreateUniqueKey";
import { getRandomKey } from "../RandomKey/GetRandomKey";
import { calculateNaturalPoint } from "../RelativePositioningCalculations/CalculateNaturalPoint"

export const saveNote = (
    imageData,
    xScreenInitial,
    yScreenInitial,
    xScreenFinal,
    yScreenFinal,
    containerOffsetX,
    containerOffsetY,
    imageDisplayWidth,
    imageDisplayHeight,
    noteTitle,
    noteText,
    )=>{
    
    let noteKey = "";
    const noteStorageKeyword = "noteKey_";

    let xNaturalInitial = calculateNaturalPoint(xScreenInitial, containerOffsetX, imageDisplayWidth, imageData.imageWidth);
    let xNaturalFinal = calculateNaturalPoint(xScreenFinal, containerOffsetX, imageDisplayWidth, imageData.imageWidth);
    let yNaturalInitial = calculateNaturalPoint(yScreenInitial, containerOffsetY, imageDisplayHeight, imageData.imageHeight);
    let yNaturalFinal = calculateNaturalPoint(yScreenFinal, containerOffsetY, imageDisplayHeight, imageData.imageHeight);

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
