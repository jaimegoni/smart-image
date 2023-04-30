import { useEffect, useState } from "react"

import "./SmartImageView.css"

import { getStoredImageByKey } from "../../../core/services/ImagesRegister/GetStoredImageByKey";
import { StandardView } from "../../templates/StandardView/StandardView";


export const SmartImageView = ({imageKey})=>{

    const [imageData, setImageData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        ()=>{
            setImageData(getStoredImageByKey);
        }
        ,[])
    
    return(
        <StandardView>
            {
                isLoading
                    ?
                <p>Loading...</p>
                    :
                <div>

                </div>
                
            }
        </StandardView>
    )
}