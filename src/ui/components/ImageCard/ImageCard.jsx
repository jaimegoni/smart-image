import { Link } from "react-router-dom";

import "./ImageCard.css"

import { deleteImageByKey } from "../../../core/services/ImagesRegister/DeleteImageByKey";

export const ImageCard = ({imageInfo})=>{

    const onDeleteImage = ()=>{
        if (confirm(`Are you sure to delete the image ${imageInfo.imageName}?`)){
            deleteImageByKey(imageInfo.key);
            window.location.reload(false);
        }
    }

    return(
        <div className="image__card--div">
            <button onClick={onDeleteImage} className="image__card--del">🗑</button>
            <Link
                to={`smartImage/${imageInfo.key}`}
                className="image__card--a"
            >
                <p style={{margin:"3px"}}>{imageInfo.imageName}</p>
                <img src={imageInfo.b64image} alt={`img_${imageInfo.imageName}`} className="image__card--img"/>
            </Link>
        </div>
    )
}