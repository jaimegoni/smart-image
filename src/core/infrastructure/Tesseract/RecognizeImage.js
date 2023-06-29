import { createWorker } from 'tesseract.js';

export const recognizeImage = async(file, language = "eng")=>{

    const worker = await createWorker();

    await worker.loadLanguage(language);
    await worker.initialize(language);

    const { data: { text } } = await worker.recognize(file);

    await worker.terminate();
    
    return text;

  }