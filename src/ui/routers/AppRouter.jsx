import { Route, Routes} from "react-router-dom";
import { FaqView } from "../views/FaqView";
import { HomeView } from "../views/HomeView/HomeView";
import { NoRouteView } from "../views/NoRouteView";
import { SmartImageView } from "../views/SmartImagesViews/SmartImageView";
import { SmartImageConfigView } from "../views/SmartImagesViews/SmartImageConfigView";
import { UsageView } from "../views/UsageView/UsageView";

export const AppRouter = ()=>{

    return(
    <Routes>
        <Route path="/smart-image/" element={<HomeView/>}/>
        <Route path="/smart-image/usage" element={<UsageView/>}/>
        <Route path="/smart-image/faq" element={<FaqView/>}/>
        <Route path="*" element={<NoRouteView/>}/>
        <Route path="/smart-image/smartImage/:imageKey" element={<SmartImageView/>}/>
        <Route path="/smart-image/smartImageConfiguration/:imageKey" element={<SmartImageConfigView/>}/>
    </Routes>
    );
}