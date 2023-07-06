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
        <Route path="/" element={<HomeView/>}/>
        <Route path="/usage" element={<UsageView/>}/>
        <Route path="/faq" element={<FaqView/>}/>
        <Route path="*" element={<NoRouteView/>}/>
        <Route path="smartImage/:imageKey" element={<SmartImageView/>}/>
        <Route path="smartImageConfiguration/:imageKey" element={<SmartImageConfigView/>}/>
    </Routes>
    );
}