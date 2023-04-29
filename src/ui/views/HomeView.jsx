
import { useEffect, useState } from "react";
import { getStoredChartByKey } from "../../core/services/ChartsRegister/GetStoredChartByKey";
import { getStoredChartsKeys } from "../../core/services/ChartsRegister/GetStoredChartsKeys";
import { ChartCard } from "../components/ChartCard/ChartCard";
import { StandardView } from "../templates/StandardView/StandardView";
import { UploadFileModal } from "../components/UploadFileModal/UploadFileModal";

export const HomeView = ()=>{

    const [modalActive, setModalActive] = useState(false);

    const chartKeys = getStoredChartsKeys();

    useEffect(()=>{
        modalActive ? console.log("Modal is: active" ) : console.log("Modal is: NOT active" )
    },[modalActive])

    return(
        <StandardView>
            <h1>Welcome</h1>
            <div style={actionsDivStyle}>
                <button className="btn btn-primary" onClick={()=>{setModalActive(!modalActive)}}>Add new image</button>
            </div>
            <div style={imagesPoolDivStyle}>
                {
                    chartKeys.length > 0
                            &&
                    chartKeys.map(
                        (key)=>{
                            return(
                                <ChartCard
                                    key={key}
                                    chartInfo={getStoredChartByKey(key)}
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
