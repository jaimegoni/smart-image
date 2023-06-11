
import PropTypes from 'prop-types';

import './TableComponents.css'

import { PageButton } from './PageButton';

const decreasePage = (showPage, setShowPage) => {
    if (showPage>0){
        setShowPage(showPage-1);
    }
}

const increasePage=(buttonsAmount, showPage, setShowPage)=>{
    if (showPage < buttonsAmount - 1){
        setShowPage(showPage+1);
    }
}

const calculateButtons = (buttonsAmount, showPage) => {

    if (buttonsAmount <= 10){
        return Array.from(Array(buttonsAmount).keys());
    }
    else{
        let buttonNumbers = [];
        if((showPage<4) || (showPage>buttonsAmount-5)){
            buttonNumbers = Array.from(Array(5).keys());
            buttonNumbers.push("...");
            for (let x = buttonsAmount-5; x<buttonsAmount;x++){
                buttonNumbers.push(x);
            }
        }
        else{
            buttonNumbers.push("...");
            for (let x = showPage-3; x < showPage+4; x++){
                buttonNumbers.push(x);
            }
            buttonNumbers.push("...");
        }
        return buttonNumbers;
    }
}


const PaginationButtons = ({tableContentLength, showRows, showPage, setShowPage}) =>{
    
    const buttonsAmount = Math.ceil(tableContentLength/showRows);

    const buttonNumbers = calculateButtons(buttonsAmount, showPage);
    return(
        <div className="table__buttons--div">
            <button key="toFirstButton" title="To first page" onClick={()=>{setShowPage(0)}} className="btn btn-outline-primary">«</button>
            <button key="prevButton"  title="Previous" onClick={()=>{decreasePage(showPage, setShowPage)}} className="btn btn-outline-primary" style={{marginRight : "2em"}}>‹</button>

            {buttonNumbers.map((x) => x === "..." ? <p key={"p_"+ Math.round(1000*Math.random())} style={{marginLeft : "1em", marginRight : "1em"}}>...</p> : <PageButton key={"pb_" + x} value={x} showPage = {showPage} setShowPage={setShowPage}/>)}

            <button key="nextButton" title="Next" onClick={()=>{increasePage(buttonsAmount, showPage, setShowPage)}} className="btn btn-outline-primary" style={{marginLeft : "2em"}}>›</button>
            <button key="toLastButton" title="To last page" onClick={()=>{setShowPage(buttonsAmount-1)}} className="btn btn-outline-primary">»</button>
        </div>
    );
}

PaginationButtons.propTypes = {
    tableContentLength : PropTypes.number.isRequired,
    showRows : PropTypes.number.isRequired,
    showPage : PropTypes.number.isRequired,
    setShowPage : PropTypes.func.isRequired,
}

export default PaginationButtons;