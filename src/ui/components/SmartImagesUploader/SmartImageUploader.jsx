import { useState } from "react";
import PropTypes from 'prop-types'

import "./SmartImageUploader.css"

export const SmartImageUploader = ({files, setFiles, acceptedTypes = ["application/JSON"]})=>{

    const inputId = "dropzoneInput"

    const [isDraggedOver, setIsDraggedOver] = useState(false)

    const handleFilesDrop = (event) =>{

        event.preventDefault();

        setIsDraggedOver(false);

        let droppedFiles = [];

        if (event.dataTransfer.items){

            const items = [...event.dataTransfer.items];

            const acceptedDroppedItems = items.map((item)=>{
                item.kind === "file" ? true : false;
            })

            droppedFiles = acceptedDroppedItems.map((droppedItem)=>(droppedItem.getAsFile()));
            
        }
        else{
            droppedFiles = [...event.dataTransfer.files];
        }

        const acceptedFiles = droppedFiles.filter((droppedFile)=>(acceptedTypes.includes(droppedFile.type)));

        if (acceptedFiles.length > 0){

            const dataTransfer = new DataTransfer();

            acceptedFiles.map((file)=>{
                dataTransfer.items.add(file);
            })
            document.getElementById(inputId).files = dataTransfer.files;
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

    const removeFile = ()=>{
        document.getElementById(inputId).value = "";
        setFiles([]);
    }

    const acceptedTypesToString = ()=>{
        let stringAcceptedTypes = "";
        acceptedTypes.forEach((type) =>{stringAcceptedTypes += type + ", "})
        return stringAcceptedTypes;
    }

    const onInputChange = (event)=>{
        if (event.target.files[0]){
            if(acceptedTypes.includes(event.target.files[0].type)){
                setFiles(event.target.files[0]);
            }
            else{
                event.target.value = "";
            }
        }
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
                    <input id={inputId} type="file" onChange={onInputChange} accept={acceptedTypesToString()}/>
                </div>
            </div>
            {
                !(files === [])
                    &&
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
                    <p>Archivo</p>
                    <button className="btn btn-outline-danger" onClick={()=>{removeFile();}}>Remove image</button>
                </div>
            }
            
        </div>
    )
}

SmartImageUploader.propTypes = {
    files : PropTypes.any,
    setFiles : PropTypes.func.isRequired,
    acceptedTypes : PropTypes.array
}