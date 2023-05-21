
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {PropTypes} from 'prop-types';

import "./UploadImageModal.css";

import { storeNewImage } from "../../../core/services/ImagesRegister/StoreNewImage";
import { imageToBase64 } from "../../../core/services/ImageToBase64/ImageToBase64";
import { extractOriginalImageSize } from "../../../core/services/ExtractOriginalImageSize/ExtractOriginalImageSize";

import { ImageUploader } from "../ImageUploader/ImageUploader";

export const UploadImageModal = ({setIsModalActive})=>{

    const textInputId = "imageNameInput";

    const [imageName, setImageName] = useState("");
    const [file, setFile] = useState(null);
    const [b64image, setB64image] = useState("");
    const [{imageWidth, imageHeight}, setImageDimensions] = useState({imageWidth:0, imageHeight:0});

    const [imageInfo, setImageInfo] = useState ({});

    const navigate = useNavigate();

    const isInformationUploaded = ()=>{
        if (!(imageName === "") && !(file === null) && !(b64image==="") && !(imageWidth===0) && !(imageHeight===0)){
            return true;
        }
        return false;
    }

    const toNextStep = ()=>{
        const imageKey = storeNewImage(imageInfo);
        navigate("/smartImageConfiguration/"+imageKey);
    }

    const getClickedElementId = (event)=>{
        if(event.target.id === "modalBackgroundDiv"){
            setIsModalActive(false);
        }
    }


    useEffect(
        () =>{
            if(!(file === null)){
                imageToBase64(file, setB64image);
            }
        }
    ,[file]);

    useEffect(()=>{

        if (!(b64image === "")){
            extractOriginalImageSize(b64image).then((imageDimensions)=>{
                setImageDimensions(imageDimensions);
            })
        }

    },[b64image])

    useEffect(()=>{

            if (isInformationUploaded()){

                setImageInfo({
                    imageName,
                    b64image,
                    imageWidth,
                    imageHeight,
                    imageNotes : []
                });
            }
            else{
                setImageInfo({});
            }
        }
        ,[imageName, imageWidth, imageHeight]);
    
    useEffect(()=>{
        document.getElementById(textInputId).focus();
    }
    ,[])

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
                        <h2> Name of the image</h2>
                        <br/>
                        <input id={textInputId} type="text" placeholder="Image name" onChange={(event) => {setImageName(event.target.value);}} style={{minWidth : "30%"}}/>
                        <br/><br/>
                        <h2> Choose an image</h2>
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

UploadImageModal.propTypes = {
    setIsModalActive : PropTypes.func.isRequired,
}