
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './LocationSquare.css';

export const LocationSquare = ({xInitial, yInitial, xCurrent, yCurrent, className, onClickFunction})=>{

    const defaultStyle = {
        "display": "none",
        "left": "0px",
        "top": "0px",
        "width": "0px",
        "height": "0px"
    }

    const [locationSquareStyle, setLocationSquareStyle] = useState(defaultStyle);

    useEffect(()=>{
        if (!(xCurrent === 0) && !(yCurrent === 0)){
            if(!(xInitial === xCurrent) && !(yInitial === yCurrent)){
                setLocationSquareStyle(
                    {
                        "display": "block",
                        "left": xInitial + "px",
                        "top": yInitial + "px",
                        "minWidth": (xCurrent - xInitial) > 0 ? (xCurrent - xInitial) + "px" : "2px",
                        "minHeight": (yCurrent - yInitial) > 0 ? (yCurrent - yInitial) + "px" : "2px"
                    }
                );
            }
            else{
                setLocationSquareStyle(defaultStyle);
            }
        }
        else{
            setLocationSquareStyle(defaultStyle);
        }
    }
    ,[ xCurrent, yCurrent])

    if(locationSquareStyle.display === "block"){
        return(
            <div
                className={`location__square--div ${className}`}    
                style={locationSquareStyle}
                onClick={onClickFunction}
            ></div>
        )
    }
    else{
        return(<></>)
    }

}

LocationSquare.propTypes = {
    xInitial : PropTypes.number.isRequired,
    yInitial : PropTypes.number.isRequired,
    xCurrent : PropTypes.number.isRequired,
    yCurrent : PropTypes.number.isRequired,
    className : PropTypes.string.isRequired,
    onClickFunction : PropTypes.func.isRequired
}