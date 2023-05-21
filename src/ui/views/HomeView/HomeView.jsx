
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./HomeView.css"

import { getStoredImageByKey } from "../../../core/services/ImagesRegister/GetStoredImageByKey";
import { getStoredImagesKeys } from "../../../core/services/ImagesRegister/GetStoredImagesKeys";

import { ImageCard } from "../../components/ImageCard/ImageCard";
import { StandardView } from "../../templates/StandardView/StandardView";
import { UploadImageModal } from "../../components/UploadImageModal/UploadImageModal";
import { deleteStoredImages } from "../../../core/services/ImagesRegister/DeleteStoredImages";

export const HomeView = ()=>{

    const [modalActive, setModalActive] = useState(false);
    const navigate = useNavigate();
    
    const imagesKeys = getStoredImagesKeys();

    const deleteAllImages = ()=>{

        if (confirm("Are you sure you want to delete all stored images?")){
            deleteStoredImages();
            navigate(0);
        }
    }
    
    return(
        <StandardView>
            <h1>Welcome</h1>
            <div className="pool__actions--div">
                <button className="btn btn-primary" onClick={()=>{setModalActive(!modalActive)}}>Add new image</button>
                <button className="btn btn-success" style={{marginLeft: "0.5em"}} onClick={()=>{setModalActive(!modalActive)}}>Download all images</button>
                <button className="btn btn-danger" style={{marginLeft: "0.5em"}} onClick={()=>{deleteAllImages()}}>Delete all images</button>
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
                modalActive
                    &&
                <UploadImageModal
                    setIsModalActive = {setModalActive}
                /> 
            }
        </StandardView>
    )
}
