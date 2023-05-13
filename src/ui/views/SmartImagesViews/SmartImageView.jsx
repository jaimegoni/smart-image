import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import "./SmartImageViews.css"

import { getStoredImageByKey } from "../../../core/services/ImagesRegister/GetStoredImageByKey";
import { StandardView } from "../../templates/StandardView/StandardView";
import { SmartImageFilter } from "../../components/SmartImageFilter/SmartImageFilter";
import { getImageInfo } from "../../../core/services/GetImageInfo/GetImageInfo";


export const SmartImageView = ()=>{

    const imgContainerId = "smartImageImg";

    const imageNotes = [
        { x0: 0, y0:0, x1:50, y1:50, text:"asdf", id:"asdf"},
        { x0: 60, y0:60, x1:100, y1:100, text:"querty", id:"querty"},
        { x0: 120, y0:120, x1:150, y1:150, text:"kas", id:"kas"}
    ];
    
    const { imageKey } = useParams();

    const [imageData, setImageData] = useState({});
    const [{imageWidth, imageHeight}, setImageInfo] = useState({imageWidth: 0, imageHeight: 0})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        ()=>{
            setImageData(getStoredImageByKey(imageKey));
        }
        ,[])

    useEffect(()=>{
        if( (Object.keys(imageData).length > 0 )){

            if(!(imageData.imageName === null)){
                setImageInfo(getImageInfo(imageData.b64image));
                setIsLoading(false);
            }
        }

    },[imageData])

    return(
        <StandardView>
            {
                isLoading
                    ?
                <p>Loading...</p>
                    :
                <>
                    <div>
                        <h2>Image name: {imageData.imageName}</h2>
                    </div>
                    <div className="view__containter--div">
                        <div className="image__container--div">
                            <div
                                id = {imgContainerId}
                                className="smart__image--img"
                                style={
                                    {
                                        backgroundImage : `url(${imageData.b64image})`,
                                        backgroundSize : "contain",
                                        backgroundRepeat : "no-repeat",
                                        height : "90vh"
                                    }
                                }
                            >

                            </div>
                        </div>
                        <SmartImageFilter
                            imageNotes = { imageNotes }
                        />
                    </div>
                </>
                
            }
        </StandardView>
    )
}