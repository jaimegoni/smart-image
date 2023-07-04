
import PropTypes from 'prop-types';

import "./Squares.css";

import { LocationSquare } from "../BaseComponents/LocationSquare";

export const CreationSquare = ({xInitial, yInitial, xFinal, yFinal})=>{

    return(
            <LocationSquare
                xInitial = {xInitial}
                yInitial = {yInitial}
                xCurrent = {xFinal}
                yCurrent = {yFinal}
                className={ "active__square--div"}
                onClickFunction={()=>{}}
            />
        )
}

CreationSquare.propTypes = {
    xInitial : PropTypes.number.isRequired,
    yInitial : PropTypes.number.isRequired,
    xFinal : PropTypes.number.isRequired,
    yFinal : PropTypes.number.isRequired,
    isActive : PropTypes.bool.isRequired,
    setIsActive: PropTypes.func.isRequired
}