

import PropTypes from 'prop-types';

import "./Squares.css";

import { LocationSquare } from "../BaseComponents/LocationSquare";

export const DraggingSquare = ({xInitial, yInitial, xCurrent, yCurrent})=>{

    return(
        <LocationSquare
            xInitial = {xInitial}
            yInitial = {yInitial}
            xCurrent = {xCurrent}
            yCurrent = {yCurrent}
            className="dragged__square--div"
            onClickFunction={()=>{}}
        />
    )

}

DraggingSquare.propTypes = {
    xInitial : PropTypes.number.isRequired,
    yInitial : PropTypes.number.isRequired,
    xCurrent : PropTypes.number.isRequired,
    yCurrent : PropTypes.number.isRequired
}