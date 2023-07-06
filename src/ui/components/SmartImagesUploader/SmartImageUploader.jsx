import { useState } from "react";
import PropTypes from 'prop-types'

import "./SmartImageUploader.css"

export const SmartImageUploader = ({files, setFiles, acceptedTypes = ["application/json"]})=>{

    const inputId = "dropzoneInput"

    const [isDraggedOver, setIsDraggedOver] = useState(false)

    const handleFilesDrop = (event) =>{

        event.preventDefault();

        setIsDraggedOver(false);

        let droppedFiles = [];

        if (event.dataTransfer.items){

            const dataTransferKeys = Object.keys(event.dataTransfer.items);
            droppedFiles = dataTransferKeys.map((key)=>(event.dataTransfer.items[key].getAsFile()));
            
        }
        else{
            droppedFiles = [...event.dataTransfer.files];
        }

        const acceptedFiles = droppedFiles.filter((droppedFile)=>(acceptedTypes.includes(droppedFile.type)));

        if (acceptedFiles.length > 0){

            updateFileInput(acceptedFiles);
            setFiles(acceptedFiles);
        }

    }

    const handleOnDragOver = (event)=>{
        event.preventDefault();
        setIsDraggedOver(true);
    }

    const handleOnDragLeave = ()=>{
        setIsDraggedOver(false);
    }

    const removeAllFiles = ()=>{
        document.getElementById(inputId).value = "";
        setFiles([]);
    }

    const removeFileByName = (fileName)=>{

        const filesAfterRemoving = files.filter(
            (file)=>(!(file.name === fileName))
        );

        if (filesAfterRemoving.length < 1){
            removeAllFiles();
            return;
        }
        else{
            updateFileInput(filesAfterRemoving);
            setFiles(filesAfterRemoving);
        }

    }

    const acceptedTypesToString = ()=>{
        let stringAcceptedTypes = "";
        acceptedTypes.forEach((type) =>{stringAcceptedTypes += type + ", "})
        stringAcceptedTypes = stringAcceptedTypes.slice(0, -2)
        return stringAcceptedTypes;
    }

    const onInputChange = (event)=>{

        let correctUploadedFiles = [];
        const chosenFiles = Object.keys(event.target.files).map(
            (key)=>(event.target.files[key])
        );

        chosenFiles.forEach((file)=>{
            if (acceptedTypes.includes(file.type)){
                correctUploadedFiles = [...correctUploadedFiles, file];
            }
        });

        if (correctUploadedFiles.length > 0){
            updateFileInput(correctUploadedFiles);
            setFiles(correctUploadedFiles);

        }
        else{
            setFiles([]);
            event.target.value = "";
        }
    }

    const updateFileInput = (files)=>{
        const dataTransfer = new DataTransfer();
        files.map((file)=>{
            dataTransfer.items.add(file);
        })
        document.getElementById(inputId).files = dataTransfer.files;
    }

    return(
        <div className="file__uploader--div">
            <div
                id="drop_zone"
                className={ isDraggedOver ? "drop_zone--div dragged__over--div" : "drop_zone--div"}
                onDrop={handleFilesDrop}
                onDragOver={handleOnDragOver}
                onDragLeave={handleOnDragLeave}
            >
                <div className="dropzone__components--div">
                    <p>Drag and drop image</p>
                    <p>or</p>
                    <input id={inputId} type="file" onChange={onInputChange} accept={acceptedTypesToString()} multiple/>
                </div>
            </div>
            {
                !(files.length <1)
                    &&
                files.map((file)=>(
                    <div
                        key={file.name}
                        style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", marginBottom:"0.5em"}}
                    >
                        <p style={{marginRight:"0.5em"}}>{file.name}</p>
                        <button className="btn btn-outline-danger" onClick={()=>{removeFileByName(file.name);}}>x</button>
                    </div>
                ))

            }
            
        </div>
    )
}

SmartImageUploader.propTypes = {
    files : PropTypes.any,
    setFiles : PropTypes.func.isRequired,
    acceptedTypes : PropTypes.array
}