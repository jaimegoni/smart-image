
import "./NavigationBar.css"

export const NavigationBar = ()=>{

    return(    
        <nav className="navigation__bar--nav">

            <div className="navigation__logo--div">
                <img src="/images/logo.png" alt="page_logo" className="navigation__logo--img"/>
                <p className="navigation__logo--p"><label>Smart Image</label></p>
            </div>

            <div className="navigation__bar--div">
                <a className="navigation__link--a" href="/" target="_self">Home</a>
                <a className="navigation__link--a" href="/uploadImage" target="_self">Extract new table</a>
                <a className="navigation__link--a" href="/faq" target="_self">FAQ</a>
            </div>
    </nav>
)
}