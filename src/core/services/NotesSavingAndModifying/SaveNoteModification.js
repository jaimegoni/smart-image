import { rewriteStoredImage } from "../ImagesRegister/RewriteStoredImage";

export const saveNoteModification = (imageData, noteKey, noteTitle, noteText)=>{

    const originalNote = imageData.imageNotes.filter((note)=>(note.noteKey === noteKey))[0];
    const newNote = {
        ...originalNote,
        noteTitle,
        noteText
    }

    const imageDataWithoutOldNote = {
        ...imageData,
        imageNotes : imageData.imageNotes.filter((note)=>(!(note.noteKey === noteKey))),
    }

    const newImageData = {
        ...imageDataWithoutOldNote,
        imageNotes : [
            ...imageDataWithoutOldNote.imageNotes,
            newNote
        ]
    }
    
    rewriteStoredImage(imageData.key, newImageData);

    return newImageData;
}