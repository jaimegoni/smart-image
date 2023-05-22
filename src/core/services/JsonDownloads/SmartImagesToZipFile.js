import { saveAs } from "file-saver";
import JSZip from "jszip";
import PropTypes from "prop-types";

export const smartImagesToZipFile = (smartImages)=>{

    var zip = new JSZip();

    smartImages.map((smartImage)=>{
            zip.file(
                smartImage.imageName + ".json",
                JSON.stringify(smartImage)
            )
        }
    )

    zip
        .generateAsync({type: "blob"})
        .then((content) =>{
            saveAs(content, "smartImages.zip")
        });
    
        return;
}

smartImagesToZipFile.propTypes = {
    smartImages : PropTypes.array.isRequired
}