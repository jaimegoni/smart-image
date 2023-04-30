
import "./StandardView.css"

import { NavigationBar } from "../NavigationBar/NavigationBar";

export const StandardView = ({children})=>{

    return(
        <>
            <NavigationBar/>
            <div className="standardview__content--div">
                {children}
            </div>
        </>
    );
}