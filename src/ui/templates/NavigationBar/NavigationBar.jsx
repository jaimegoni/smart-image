
import { Link } from "react-router-dom"

import "./NavigationBar.css"

export const NavigationBar = ()=>{

    return(    
        <nav className="navigation__bar--nav">

            <div className="navigation__logo--div">
                <img src="/images/logo.png" alt="page_logo" className="navigation__logo--img"/>
                <p className="navigation__logo--p"><label>Smart Image</label></p>
            </div>

            <div className="navigation__bar--div">
                <Link className="navigation__link--a" to="/" target="_self">Home</Link>
                <Link className="navigation__link--a" to="/faq" target="_self">FAQ</Link>
            </div>
    </nav>
)
}