
import PropTypes from 'prop-types';

import './TableComponents.css';

export const QuickFilter = ({setQuickFilter, setShowPage})=>{

    const updateQuickFilter = (event)=>{
        setQuickFilter(event.target.value);
        setShowPage(0);
    }
    return (
        <div className='quick__filter--div'>
            <label>Filter:</label>
            <input type="text" onChange={updateQuickFilter}/>
        </div>
    );
}

QuickFilter.propTypes = {
    setQuickFilter : PropTypes.func.isRequired,
    setShowPage : PropTypes.func.isRequired,
}