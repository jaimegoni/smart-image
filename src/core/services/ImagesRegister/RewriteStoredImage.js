
import { saveObject } from "../../infrastructure/MemoryStorage/SaveObject";

export const rewriteStoredImage = (imageKey, image) =>{
    saveObject(
        imageKey,
        image
    );
}