
import {useState} from "react";
import PropTypes from 'prop-types';


import {PaginationSelect} from "./TableComponents/PaginationSelect";
import {QuickFilter} from "./TableComponents/QuickFilter";
import {PaginationButtons} from "./TableComponents/PaginationButtons";

const filterData = (quickFilter, tableContent) => {
    if (quickFilter === ""){
        return tableContent;
    }
    else{
        let filteredData = [];
        let filtersToApply = quickFilter.split(" ");

        for (let i = 0; i<tableContent.length; i++){
            const row = tableContent[i];
            let acceptedRow = false;
            for (let j=0; j<filtersToApply.length; j++){
                const filter = filtersToApply[j].toString();
                for (let k=0; k<row.length; k++){
                    const data = tableContent[i][k].toString();
                    if (data.includes(filter)){
                        acceptedRow = true;
                    }
                }
            }
            if (acceptedRow){
                filteredData = filteredData.concat([row]);
            }
        }
        return filteredData;
    }
}

const configureSort = (columnName, sortColumn, setSortColumn, sortColumnType, setSortColumnType) => {

    if (columnName === sortColumn){
        if (sortColumnType === "descending"){
            setSortColumnType("ascending");
        }
        else{
            setSortColumnType("descending");
        }
    }
    else{
        setSortColumnType("ascending");
    }
    setSortColumn(columnName);
}

const sortByColumn = (sortColumn, sortColumnType, tableHeaders, filteredData) => {

    if (sortColumn === ""){
        return filteredData;
    }
    else{
        const colIndex = tableHeaders.indexOf(sortColumn);
        filteredData.sort(
            (a,b) =>{
                if((typeof a[colIndex] === 'number') || (typeof b[colIndex] === 'number')){
                    if (sortColumnType === "descending"){
                        return (b[colIndex]-a[colIndex]);
                    }
                    else{
                        return (a[colIndex]-b[colIndex]);
                    }
                }
                else{
                    if (sortColumnType === "descending"){
                        if (a[colIndex]<b[colIndex]){
                            return 1;
                        }
                        else if (a[colIndex]>b[colIndex]){
                            return -1;
                        }
                        else{
                            return 0;
                        }
                    }
                    else{
                        if (a[colIndex]>b[colIndex]){
                            return 1;
                        }
                        else if (a[colIndex]<b[colIndex]){
                            return -1;
                        }
                        else{
                            return 0;
                        }
                    }
                    
                }
            }
        )
        return filteredData;
    }
}

export const Table = ({tableLabels, tableHeaders, tableContent, createRowCallback}) => {

    const [sortColumn, setSortColumn] = useState("");
    const [sortColumnType, setSortColumnType] = useState("none");
    const [showRows, setShowRows] = useState(25);
    const [showPage, setShowPage] = useState(0);
    const [quickFilter, setQuickFilter] = useState("");

    let filteredData = filterData(quickFilter, tableContent);
    filteredData = sortByColumn(sortColumn, sortColumnType, tableHeaders, filteredData);
    let showData = filteredData.slice(showPage*showRows, showRows*(showPage+1))
    
    return(
        <div>
            <div className="quick__options--div">
                <PaginationSelect
                    showRows = {showRows}
                    setShowRows = {setShowRows}
                    setShowPage = {setShowPage}
                    filteredDataLength ={filteredData.length}
                />
                <QuickFilter
                    setQuickFilter = {setQuickFilter}
                    setShowPage = {setShowPage}
                />
            </div>
            <div>
                <table className="table table-bordered">
                    <thead className="sticky__thead">
                        <tr key="HeaderRow" className="head__tr">
                            {
                                tableHeaders.map(
                                    (colHeader)=>(
                                        <th
                                            key={colHeader}
                                            onClick={()=>{configureSort(colHeader, sortColumn, setSortColumn, sortColumnType, setSortColumnType)}}
                                        >
                                            {   
                                                colHeader === sortColumn ? sortColumnType === "ascending" ? "🔺" + tableLabels[tableHeaders.indexOf(colHeader)] : "🔻" + tableLabels[tableHeaders.indexOf(colHeader)]  : tableLabels[tableHeaders.indexOf(colHeader)]
                                            }
                                        </th>
                                        )
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            showData.length > 0
                                    ?
                            showData.map(
                                (rowData)=>(createRowCallback(rowData))
                            )
                                    :
                            <p><i>No data to show</i></p>
                        }
                    </tbody>
                </table>
            </div>
            <PaginationButtons
                tableContentLength = {filteredData.length}
                showRows = {showRows}
                showPage = {showPage}
                setShowPage = {setShowPage}
            />
        </div>
    );

}

Table.propTypes = {
    tableLabels : PropTypes.array.isRequired,
    tableHeaders : PropTypes.array.isRequired,
    tableContent : PropTypes.array.isRequired,
    createRowCallback : PropTypes.func.isRequired,
}
