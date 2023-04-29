
import { saveObject } from "../../infrastructure/MemoryStorage/SaveObject";

export const rewriteStoredChart = (chartKey, chart) =>{
    saveObject(
        chartKey,
        chart
    );
}