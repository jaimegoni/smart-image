import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { StandardView } from "../templates/StandardView/StandardView";
import { getStoredChartByKey } from "../../core/services/ChartsRegister/GetStoredChartByKey";
import { rewriteStoredChart } from "../../core/services/ChartsRegister/RewriteStoredChart";
import { floodFill } from "../../core/services/FloodFill/FloodFill";

const canvasId = "tablePickerCanvas";

const setUpCanvas = (imgSrc, canvasCtx)=>{
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const canvas = document.getElementById(canvasId);

    canvas.width = imgWidth;
    canvas.height = imgHeight;

    canvasCtx.drawImage(img, 0, 0);

    /*const canvas_context = canvas.getContext('2d');
    canvas_context.drawImage(img, 0, 0)*/
}

const getImgArray = () =>{
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    console.log("imgWidth: " + imgWidth);
    console.log("imgHeight: " + imgHeight);

    let imgArray = [];
    
    for (let i = 0; i<imgWidth; i++){

        let row = [];

        for (let j=0; j<imgHeight; j++){
            const imgData = ctx.getImageData(i, j, 1, 1);
            const pixel = imgData.data;
            let value = 0;
            try{
                value = rgbaToValue(pixel[0], pixel[1], pixel[2],pixel[3]);
            }
            catch{
                console.log(`Error at pixel ${i} ,  ${j}`);
                console.log(`Pixel values ${pixel[0]} ,  ${pixel[1]} ,  ${pixel[2]} ,  ${pixel[3]} ` );
            }
            row = [...row, value];
        }

        imgArray = [...imgArray, row];
    }

    return imgArray;
}

const rgbaToValue = (r, g, b, a)=>{
    let string_r = r.toString(16);
    let string_g = g.toString(16);
    let string_b = b.toString(16);
    let string_a = a.toString(16);
  
    if (string_r.length == 1){
        string_r = "0" + string_r;
    }
    if (string_g.length == 1){
        string_g = "0" + string_g;
    }
    if (string_b.length == 1){
        string_b = "0" + string_b;
    }
    if (string_a.length == 1){
    string_a = "0" + string_a;
    }

    return string_r + string_g + string_b + string_a;

}

const createEmptyTable = () =>{
    const canvas = document.getElementById(canvasId);

    const columns = canvas.width;
    const rows = canvas.height;

    let emptyTable = [];
    for (let i = 0; i<rows; i++){

        let row = [];

        for (let j=0; j<columns; j++){

            row = [...row, 0];
        }

        emptyTable = [...emptyTable, row];
    }
}

export const SelectAxisView = ()=>{
    
    const { chartKey } = useParams();

    const chartData = getStoredChartByKey(chartKey);
    const [canvasCtx, setCanvasCtx] = useState(null);

    const onCanvasClick = (event) =>{

        const canvas = document.getElementById(canvasId);
        const bounding = canvas.getBoundingClientRect();

        const x0 = Math.round(event.clientX - bounding.left);
        const y0 = Math.round(event.clientY - bounding.top);

        floodFill(x0, y0, canvasCtx);

    }

    useEffect(() => {

        const canvas = document.getElementById(canvasId);
        setCanvasCtx(canvas.getContext("2d", { willReadFrequently: true }));

    }, []);

    useEffect(() => {

        if(!(canvasCtx === null)){
            setUpCanvas(chartData.b64image, canvasCtx);
        }
    }, [canvasCtx]);

    return(
        <StandardView>
            <h1>Table name: {chartData.chartName}</h1>
            <hr/>
            <canvas id={canvasId} onClick={onCanvasClick}/>

        </StandardView>
    )
}