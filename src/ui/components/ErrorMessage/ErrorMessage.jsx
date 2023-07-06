
import "./ErrorMessage.css"

export const ErrorMessage = ({title, content})=>{

    return(
        <>
            <div className="error__message--div"><h1 className="error__message--h1">❌ Error ❌</h1></div>
            <div className="error__title--div"><h2 className="error__title--h2">{title}</h2></div>
            <div className="error__content--div"><p>{content}</p></div>
        </>
    )
}