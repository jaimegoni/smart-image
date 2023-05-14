import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";

import "./SmartImageViews.css"

import { getStoredImageByKey } from "../../../core/services/ImagesRegister/GetStoredImageByKey";

import { StandardView } from "../../templates/StandardView/StandardView";
import { SmartImageVisualization } from "../../components/SmartImageVisualization/SmartImageVisualization";
import { SmartImageFilter } from "../../components/SmartImageFilter/SmartImageFilter";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";



export const SmartImageView = ()=>{

    const { imageKey } = useParams();

    const [imageData, setImageData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(
        ()=>{
            setImageData(getStoredImageByKey(imageKey));
            setIsLoading(false);
        }
        ,[imageKey]
    )

    return(
        <StandardView>
            {
                isLoading
                    &&
                <p>Loading...</p>
            }
            {
                (!isLoading && (imageData === null))
                    &&
                <ErrorMessage
                    title="Error at SmartImageView.jsx"
                    content="Image data not found in localstorage"
                />
            }
            {
                (!isLoading && !(imageData === null))
                    &&
                <>
                    <div className="title__container--div">
                        <h2>Image name: {imageData.imageName}</h2>
                    </div>
                    <div className="actions__container--div">
                        <Link to={`/smartImage/${imageKey}`} className="btn btn-primary">
                            View
                        </Link>
                        <Link to={`/smartImageConfiguration/${imageKey}`} className="btn btn-outline-primary" style={{marginLeft : "1em"}}>
                            Configuration
                        </Link>

                    </div>
                    <div className="image__container--div">
                        <SmartImageVisualization
                            imageData = {imageData}
                        />
                    </div>
                </>
                
            }
        </StandardView>
    )
}