import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import "./SmartImageViews.css"

import { getStoredImageByKey } from "../../../core/services/ImagesRegister/GetStoredImageByKey";
import { calculateImageDisplayDimensions } from "../../../core/services/RelativePositioningCalculations/CalculateImageDisplayDimensions";

import { StandardView } from "../../templates/StandardView/StandardView";
import { SmartImageFilter } from "../../components/SmartImageFilter/SmartImageFilter";



export const SmartImageView = ()=>{

    const imgContainerId = "smartImageImg";

    const imageNotes = [
        { x0: 0, y0:0, x1:50, y1:50, text:"asdf", id:"asdf"},
        { x0: 60, y0:60, x1:100, y1:100, text:"querty", id:"querty"},
        { x0: 120, y0:120, x1:150, y1:150, text:"kas", id:"kas"}
    ];
    
    const { imageKey } = useParams();

    const [imageData, setImageData] = useState({});
    const [isImportingImage, setIsImportingImage] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [screenWidth, setScreenWidth] = useState(screen.width);
    const [{imageDisplayWidth, imageDisplayHeight} , setDisplayDimensions] = useState({imageDisplayWidth : 0, imageDisplayHeight : 0})

    const onResizeActions = ()=>{
            setScreenWidth(screen.width);
    }

    useEffect(
        ()=>{
            window.addEventListener('resize', onResizeActions);

            return(window.removeEventListener("beforeunload", onResizeActions));
        }
        ,[]
    )

    useEffect(
        ()=>{
            setImageData(getStoredImageByKey(imageKey));
            setIsImportingImage(false);
        }
        ,[imageKey]
    )
    
    useEffect(()=>{
            if(!(isImportingImage)){
                setDisplayDimensions(calculateImageDisplayDimensions(screenWidth, imageData.imageWidth, imageData.imageHeight));
                setIsLoading(false);
            }
        }
        ,[isImportingImage, screenWidth]
    )
    
    useEffect(()=>{
        console.log(`imageDisplayWidth=${imageDisplayWidth}, imageDisplayHeight=${imageDisplayHeight}`);
        }
        ,[imageDisplayWidth, imageDisplayHeight]
    )
    

    return(
        <StandardView>
            {
                isLoading
                    ?
                <p>Loading...</p>
                    :
                <>
                    <div className="title__container--div">
                        <h2>Image name: {imageData.imageName}</h2>
                    </div>
                    <div className="actions__container--div">
                        <Link to={`smartImage/${imageKey}`} className="btn btn-primary">
                            View
                        </Link>
                        <Link to={`smartImageConfiguration/${imageKey}`} className="btn btn-outline-primary" style={{marginLeft : "1em"}}>
                            Configuration
                        </Link>

                    </div>
                    <div className="image__container--div">
                        <div
                            id = {imgContainerId}
                            className="smart__image--img"
                            style={
                                {
                                    backgroundImage : `url(${imageData.b64image})`,
                                    backgroundSize : "contain",
                                    backgroundRepeat : "no-repeat",
                                    width : `${imageDisplayWidth}px`,
                                    height : `${imageDisplayHeight}px`
                                }
                            }
                        >

                        </div>
                    </div>
                </>
                
            }
        </StandardView>
    )
}