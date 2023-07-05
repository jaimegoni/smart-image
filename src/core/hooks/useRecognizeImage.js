
import { useEffect, useState } from "react";

import { recognizeImage } from "../infrastructure/Tesseract/RecognizeImage";

export const useRecognizeImage = (language = "eng") =>{

    const [file, setFile] = useState(undefined);
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [recognizedText, setRecognizedText] = useState("");

    useEffect(()=>{
        if (!(file === undefined)){
            setIsRecognizing(true);

            recognizeImage(file)
                .then(
                    (text)=>{
                        setRecognizedText(text);
                        setIsRecognizing(false);
                    }
                )
                .catch(()=>{
                    setIsRecognizing(false);
                    setHasError(true);
                    console.log("Error at useRecognizeImage: error when using function 'recognizeImage'");
                })
        }
    }
    ,[file, language])

    return([{isRecognizing, hasError, recognizedText}, setFile]);
}