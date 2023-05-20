import { DraggingSquare } from "./DraggingSquare"

export const TemporalSquare = ({xInitial, yInitial, xFinal, yFinal})=>{

    return(
        <DraggingSquare
            xInitial= {xInitial}
            yInitial= {yInitial}
            xCurrent= {xFinal}
            yCurrent= {yFinal}
            isDragging= {false}
        />
    )
}