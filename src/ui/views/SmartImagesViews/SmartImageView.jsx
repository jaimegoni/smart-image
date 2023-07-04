import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";

import "./SmartImageViews.css"

import { getStoredImageByKey } from "../../../core/services/ImagesRegister/GetStoredImageByKey";

import { StandardView } from "../../templates/StandardView/StandardView";

import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { NotesFilter } from "../../components/NotesFilter/NotesFilter";
import { VisualizationSmartImage } from "../../components/SmartImages";



export const SmartImageView = ()=>{

    const { imageKey } = useParams();

    const [imageData, setImageData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [activeNotesKeys, setActiveNotesKeys] = useState([]);
    
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
                    <NotesFilter
                        imageNotes={imageData.imageNotes}
                        activeNotesKeys={activeNotesKeys}
                        setActiveNotesKeys={setActiveNotesKeys}
                    />
                    <div className="image__container--div">
                        <VisualizationSmartImage
                            imageData = {imageData}
                        />
                    </div>
                </>
                
            }
        </StandardView>
    )
}