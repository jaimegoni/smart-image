
import { useState, useEffect } from "react";

export const DraggingSquare = ({xInitial, yInitial, xCurrent, yCurrent})=>{

    const resetDraggedSquareStyle = {
        "display": "none",
        "left": "0px",
        "top": "0px",
        "width": "0px",
        "height": "0px"
    }

    const [draggedSquareStyle, setDraggedSquareStyle] = useState(resetDraggedSquareStyle);

    useEffect(()=>{
        if (!(xCurrent === 0) && !(yCurrent === 0)){
            if(!(xInitial === xCurrent) && !(yInitial === yCurrent)){
                setDraggedSquareStyle(
                    {
                        "display": "block",
                        "left": xInitial + "px",
                        "top": yInitial + "px",
                        "minWidth": (xCurrent - xInitial) > 0 ? (xCurrent - xInitial) + "px" : "2px",
                        "minHeight": (yCurrent - yInitial) > 0 ? (yCurrent - yInitial) + "px" : "2px"
                    }
                );
            }
        }
        else{
            setDraggedSquareStyle(resetDraggedSquareStyle);
        }
    }
    ,[ xCurrent, yCurrent])

    if(draggedSquareStyle.display === "block"){
        return(
            <div
                className="dragged__square--div"
                style={draggedSquareStyle}
            ></div>
        )
    }
    else{
        return(<></>)
    }

}