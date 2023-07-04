
import PropTypes from 'prop-types';

import "./Squares.css";

import { LocationSquare } from "../BaseComponents/LocationSquare";

export const VisualizationSquare = ({xInitial, yInitial, xCurrent, yCurrent, isActive, setIsActive})=>{

    return(
            <LocationSquare
                xInitial = {xInitial}
                yInitial = {yInitial}
                xCurrent = {xCurrent}
                yCurrent = {yCurrent}
                className={ isActive ? "active__square--div" : "visualization__square--div"}
                onClickFunction={()=>{setIsActive(!(isActive));}}
            />
        )
}

VisualizationSquare.propTypes = {
    xInitial : PropTypes.number.isRequired,
    yInitial : PropTypes.number.isRequired,
    xCurrent : PropTypes.number.isRequired,
    yCurrent : PropTypes.number.isRequired,
    isActive : PropTypes.bool.isRequired,
    setIsActive : PropTypes.func.isRequired
}