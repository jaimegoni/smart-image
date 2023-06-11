
import PropTypes from 'prop-types';

import './TableComponents.css';

export const PaginationSelect = ({showRows, setShowRows, setShowPage, filteredDataLength}) =>{

    const showRowsOptions = [10, 25, 50, 100, 250, 500];

    const updatePagination = (event)=>{
        setShowRows(Number(event.target.value));
        setShowPage(0);
    }

    return (
        <div className='pagination__select--div'>
            <label>Show rows:</label>
            <select
                value ={showRows}
                className='pagination__select--select'
                onChange={updatePagination}
            >
                {
                    showRowsOptions.map(
                        (option) => (<option key={option}> {option} </option>)
                        )
                    }
            </select>
            <label>out of {filteredDataLength}</label>
        </div>
    );
}

PaginationSelect.propTypes = {
    showRows : PropTypes.number.isRequired,
    setShowRows : PropTypes.func.isRequired,
    setShowPage : PropTypes.func.isRequired,
    filteredDataLength : PropTypes.number.isRequired,
}
