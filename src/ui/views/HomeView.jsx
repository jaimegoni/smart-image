
import { useState } from "react";

import { getStoredImageByKey } from "../../core/services/ImagesRegister/GetStoredImageByKey";
import { getStoredImagesKeys } from "../../core/services/ImagesRegister/GetStoredImagesKeys";

import { ImageCard } from "../components/ImageCard/ImageCard";
import { StandardView } from "../templates/StandardView/StandardView";
import { UploadFileModal } from "../components/UploadFileModal/UploadFileModal";

export const HomeView = ()=>{

    const [modalActive, setModalActive] = useState(false);

    const imagesKeys = getStoredImagesKeys();
    
    return(
        <StandardView>
            <h1>Welcome</h1>
            <div style={actionsDivStyle}>
                <button className="btn btn-primary" onClick={()=>{setModalActive(!modalActive)}}>Add new image</button>
            </div>
            <div style={imagesPoolDivStyle}>
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
                <UploadFileModal
                    setIsModalActive = {setModalActive}
                /> 
            }
        </StandardView>
    )
}

const imagesPoolDivStyle = {
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"stretch"
};

const actionsDivStyle = {
    ...imagesPoolDivStyle,
    padding: "0.5em",
}
