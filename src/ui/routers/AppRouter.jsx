import { Route, Routes} from "react-router-dom";
import { FaqView } from "../views/FaqView";
import { HomeView } from "../views/HomeView/HomeView";
import { NoRouteView } from "../views/NoRouteView";

export const AppRouter = ()=>{

    return(
    <Routes>
        <Route path="/" element={<HomeView/>}/>
        <Route path="/faq" element={<FaqView/>}/>
        <Route path="*" element={<NoRouteView/>}/>
        <Route path="selectAxis/:chartKey" element={<p>Something</p>}/>
    </Routes>
    );
}