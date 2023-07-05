import { getRandomKey } from "./GetRandomKey"

export const createUniqueKey = (existingKeys, keyword="", keyLength=10)=>{

    let newKey = keyword + getRandomKey(keyLength);

    while(existingKeys.includes(newKey)){
        newKey = keyword + getRandomKey(keyLength);
    }

    return newKey;
}