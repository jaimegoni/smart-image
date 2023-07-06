
import { useState} from "react";
import { useNavigate } from "react-router-dom";

import {PropTypes} from 'prop-types';

import { SmartImageUploader } from "../SmartImagesUploader/SmartImageUploader";
import { readJson } from "../../../core/services/ReadJson/ReadJson";
import { storeNewImage } from "../../../core/services/ImagesRegister/StoreNewImage";

import { LargeModalDialog } from "../Modal/LargeModalDialog";
import { ModalBody } from "../Modal/ModalBody";
import { ModalFooter } from "../Modal/ModalFooter";

export const UploadSmartImageModal = ({setIsModalActive})=>{

    const [files, setFiles] = useState([]);
    

    const navigate = useNavigate();

    const isInformationUploaded = ()=>{
        if (!(files.length === 0)){
            return true;
        }
        return false;
    }


    const toNextStep = async()=>{
        let smartImages = [];

        files.forEach(async(file)=>{
            let data = await readJson(file);
            smartImages = [...smartImages, data];
            if (smartImages.length === files.length){
                saveAndRefresh(smartImages);
            }
        })
        
        //navigate(0);
    }

    const saveAndRefresh = (smartImages)=>{
        smartImages.map((sImage)=>{storeNewImage(sImage)})
        navigate(0);
    }

    return(
        <LargeModalDialog
            setIsModalActive={setIsModalActive}
            modalTitle="Upload SmartImage"
        >
                <>
                    <ModalBody>
                    <>
                        <h2 style={{textAlign:"center"}}> Choose smart images</h2>
                        <h2 style={{textAlign:"center"}}>(json files)</h2>
                        <br/>
                        <SmartImageUploader
                            files={files}
                            setFiles={setFiles}
                        />
                    </>
                    </ModalBody>
                    <ModalFooter
                        setIsModalActive={setIsModalActive}
                    >
                    <>
                        {
                            isInformationUploaded()
                                &&
                            <button className="btn btn-primary" onClick={()=>{toNextStep()}}>Continue</button>
                        }
                    </>
                    </ModalFooter>
                </>
        </LargeModalDialog>
    )
}

UploadSmartImageModal.propTypes = {
    setIsModalActive : PropTypes.func.isRequired,
}