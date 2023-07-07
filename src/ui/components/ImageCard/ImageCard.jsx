import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import "./ImageCard.css";

import { deleteImageByKey } from "../../../core/services/ImagesRegister/DeleteImageByKey";

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { objectToDownloadLink } from "../../../core/services/JsonDownloads/ObjectToDownloadLink";

export const ImageCard = ({imageInfo})=>{

    const onDeleteImage = ()=>{
        if (confirm(`Are you sure to delete the image "${imageInfo.imageName}"?`)){
            deleteImageByKey(imageInfo.key);
            window.location.reload(false);
        }
    }

    return(
        <>
        {
            imageInfo === null
                    ?
            <div className="image__card--div">
                <ErrorMessage
                    title="Error at ImageCard.jsx"
                    content="Image data not found in localstorage"
                />
            </div>
                    :
            <div className="image__card--div">
                <div className="image__actions--div">
                    <a  className="image__card--download" target="_blank" rel="noreferrer" href={objectToDownloadLink(imageInfo)} download={imageInfo.imageName + ".json"}><img src="./images/download_icon.png" alt="downloadIcon" className="image__download--img"/></a>
                    <button onClick={onDeleteImage} className="image__card--del">🗑</button>
                </div>

                <Link
                    to={`/smartImage/${imageInfo.key}`}
                    className="image__card--a"
                    title={imageInfo.imageName}
                >
                    <p className="image__title--p">{imageInfo.imageName}</p>
                    <img src={imageInfo.b64image} alt={`img_${imageInfo.imageName}`} className="image__card--img"/>
                </Link>
            </div>
        }
    </>
    )
}

ImageCard.propTypes = {
    imageInfo: PropTypes.object.isRequired
}