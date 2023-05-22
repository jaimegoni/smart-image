
import { useState} from "react";
import { useNavigate } from "react-router-dom";

import {PropTypes} from 'prop-types';

import "./UploadImageModal.css";

import { ImageUploader } from "../ImageUploader/ImageUploader";

export const UploadSmartImageModal = ({setIsModalActive})=>{

    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const isInformationUploaded = ()=>{
        if (!(file === null)){
            return true;
        }
        return false;
    }

    const toNextStep = ()=>{
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
                        <h2> Choose smart images (json files)</h2>
                        <br/>
                        <ImageUploader
                            file={file}
                            setFile={setFile}
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