
import { useState} from "react";
import { useNavigate } from "react-router-dom";

import {PropTypes} from 'prop-types';

import "./UploadSmartImageModal.css";

import { SmartImageUploader } from "../SmartImagesUploader/SmartImageUploader";
import { readJson } from "../../../core/services/ReadJson/ReadJson";
import { storeNewImage } from "../../../core/services/ImagesRegister/StoreNewImage";

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

    const getClickedElementId = (event)=>{
        if(event.target.id === "modalBackgroundDiv"){
            setIsModalActive(false);
        }
    }


    return(
        <div
            id="modalBackgroundDiv"
            onClick={getClickedElementId}
            className="modal fade show"
            role="dialog"
            tabIndex={-1}
            style={
                {
                    display: "block",
                    backgroundColor: "rgb(153,153,153,0.5)"
                }
            }
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content" style={{borderColor:"blue"}}>
                    <div className="modal-header">
                        <h5 className="modal-tilte">Upload image</h5>
                        <button type="button" className="close close__button" onClick={()=>{setIsModalActive(false)}}>
                            <span >x</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <h2 style={{textAlign:"center"}}> Choose smart images</h2>
                        <h2 style={{textAlign:"center"}}>(json files)</h2>
                        <br/>
                        <SmartImageUploader
                            files={files}
                            setFiles={setFiles}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"  onClick={()=>{setIsModalActive(false)}}>Close</button>
                        {
                            isInformationUploaded()
                                &&
                            <button className="btn btn-primary" onClick={()=>{toNextStep()}}>Continue</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

UploadSmartImageModal.propTypes = {
    setIsModalActive : PropTypes.func.isRequired,
}