import PropTypes from 'prop-types';

export const PageButton = ({value, showPage, setShowPage})=> {
    return(
        <button onClick={()=>{setShowPage(value)}} className={showPage === value ? "btn btn-primary" : "btn btn-outline-primary"}>
            {value}
        </button>
    );
};

PageButton.propTypes = {
    value: PropTypes.number.isRequired,
    showPage: PropTypes.number.isRequired,
    setShowPage: PropTypes.func.isRequired

}