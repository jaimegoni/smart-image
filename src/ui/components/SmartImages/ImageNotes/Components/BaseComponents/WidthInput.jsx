
import PropTypes from 'prop-types';

import './WidthInput.css';

export const WidthInput = ({displayWidth, setDisplayWidth, maxImageDisplayWidth})=>{

    return(
        <div className='image__width--div'>
        <label>Set image width:</label>
            <input
                type="number"
                className='image__width--input'
                min={Math.round(maxImageDisplayWidth/4)}
                max={maxImageDisplayWidth}
                value={displayWidth}
                onChange={(event)=>{setDisplayWidth(event.target.value)}}
            />
        </div>
    )
}

WidthInput.propTypes = {
    displayWidth: PropTypes.number.isRequired,
    setDisplayWidth: PropTypes.func.isRequired,
    maxImageDisplayWidth: PropTypes.number.isRequired
}