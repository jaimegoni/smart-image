
import { useState } from "react";

import "./HomeView.css"

import { getStoredImageByKey } from "../../../core/services/ImagesRegister/GetStoredImageByKey";
import { getStoredImagesKeys } from "../../../core/services/ImagesRegister/GetStoredImagesKeys";

import { ImageCard } from "../../components/ImageCard/ImageCard";
import { StandardView } from "../../templates/StandardView/StandardView";
import { UploadImageModal } from "../../components/UploadImageModal/UploadImageModal";

export const HomeView = ()=>{

    const [modalActive, setModalActive] = useState(false);

    const imagesKeys = getStoredImagesKeys();
    
    return(
        <StandardView>
            <h1>Welcome</h1>
            <div className="pool__actions--div">
                <button className="btn btn-primary" onClick={()=>{setModalActive(!modalActive)}}>Add new image</button>
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
