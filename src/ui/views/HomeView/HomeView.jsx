
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./HomeView.css"

import { getStoredImageByKey } from "../../../core/services/ImagesRegister/GetStoredImageByKey";
import { getStoredImagesKeys } from "../../../core/services/ImagesRegister/GetStoredImagesKeys";

import { ImageCard } from "../../components/ImageCard/ImageCard";
import { StandardView } from "../../templates/StandardView/StandardView";
import { UploadImageModal } from "../../components/UploadImageModal/UploadImageModal";
import { deleteStoredImages } from "../../../core/services/ImagesRegister/DeleteStoredImages";
import { smartImagesToZipFile } from "../../../core/services/JsonDownloads/SmartImagesToZipFile";
import { UploadSmartImageModal } from "../../components/UploadSmartImageModal/UploadSmartImageModal";

export const HomeView = ()=>{

    const [uploadImageModalActive, setUploadImageModalActive] = useState(false);
    const [uploadSmartImageModalActive, setUploadSmartImageModalActive] = useState(false);
    const navigate = useNavigate();
    
    const imagesKeys = getStoredImagesKeys();

    const deleteAllImages = ()=>{

        if (confirm("Are you sure you want to delete all stored images?")){
            deleteStoredImages();
            navigate(0);
        }
    }

    const downloadSmartImages = ()=>{
        const smartImages = imagesKeys.map((imageKey)=>(getStoredImageByKey(imageKey)));
        smartImagesToZipFile(smartImages);
    }
    
    return(
        <StandardView>
            <h1>Welcome</h1>
            <div className="pool__actions--div">
                <button className="btn btn-outline-primary" onClick={()=>{setUploadImageModalActive(!uploadImageModalActive)}}>Add new image</button>
                <button className="btn btn-outline-warning" style={{marginLeft: "0.5em"}} onClick={()=>{setUploadSmartImageModalActive(!uploadImageModalActive)}}>Upload Smart Image</button>
                <button className="btn btn-outline-success" style={{marginLeft: "0.5em"}} onClick={()=>{downloadSmartImages()}}>Download all images</button>
                <button className="btn btn-outline-danger" style={{marginLeft: "0.5em"}} onClick={()=>{deleteAllImages()}}>Delete all images</button>
            </div>
            <div className="images__pool--div">
                {
                    imagesKeys.length > 0
                            &&
                    imagesKeys.map(
                        (key)=>{
                            return(
                                <ImageCard
                                    key={key}
                                    imageInfo={getStoredImageByKey(key)}
                                />
                            );
                        }
                    )
                }
            </div>
            {
                uploadImageModalActive
                    &&
                <UploadImageModal
                    setIsModalActive = {setUploadImageModalActive}
                /> 
            }
            {
                uploadSmartImageModalActive
                    &&
                <UploadSmartImageModal
                    setIsModalActive = {setUploadSmartImageModalActive}
                />
            }

        </StandardView>
    )
}
