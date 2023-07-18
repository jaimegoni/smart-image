
import PropTypes from 'prop-types';

import "./Squares.css";

import { LocationSquare } from "../BaseComponents/LocationSquare";

export const VisualizationSquare = ({xInitial, yInitial, xFinal, yFinal, isActive, setIsActive, imageNote})=>{

    return(
            <LocationSquare
                xInitial = {xInitial}
                yInitial = {yInitial}
                xCurrent = {xFinal}
                yCurrent = {yFinal}
                className={ isActive ? "active__square--div" : "visualization__square--div"}
                onClickFunction={()=>{setIsActive(!(isActive));}}
                imageNote={imageNote}
            />
        )
}

VisualizationSquare.propTypes = {
    xInitial : PropTypes.number.isRequired,
    yInitial : PropTypes.number.isRequired,
    xFinal : PropTypes.number.isRequired,
    yFinal : PropTypes.number.isRequired,
    isActive : PropTypes.bool.isRequired,
    setIsActive : PropTypes.func.isRequired,
    imageNote: PropTypes.object
}