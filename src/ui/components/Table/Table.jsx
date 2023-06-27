
import {useState, useEffect} from "react";
import PropTypes from 'prop-types';

import "./Table.css";

import {PaginationSelect} from "./TableComponents/PaginationSelect";
import {QuickFilter} from "./TableComponents/QuickFilter";
import {PaginationButtons} from "./TableComponents/PaginationButtons";
import { Thead } from "./TableComponents/Thead";

const sortArrayByColumn = (data, shortColumn, shortOrder) => {
    const sortedArray = [...data]; // Create a copy of the original array to avoid modifying it
  
    sortedArray.sort((a, b) => {
        const valueA = a[shortColumn].toString().toLowerCase();
        const valueB = b[shortColumn].toString().toLowerCase();
        
        let result = 0;
    
        if (valueA < valueB) {
            result = -1;
        } else if (valueA > valueB) {
            result = 1;
        }
    
        return shortOrder === "ascending" ? result : -result;
    });
  
    return sortedArray;
  }

export const Table = ({tableLabels, tableHeaders, tableContent, createRowCallback}) => {

    const [sortColumn, setSortColumn] = useState("");
    const [sortColumnType, setSortColumnType] = useState("ascending");

    const [showRows, setShowRows] = useState(25);
    const [showPage, setShowPage] = useState(0);
    const [quickFilter, setQuickFilter] = useState("");

    const [filteredData, setFilteredData] = useState(tableContent);
    const [showData, setShowData] = useState(filteredData.slice(showPage*showRows, showRows*(showPage+1)));

    const filterData = () => {
        if (quickFilter === ""){
            return tableContent;
        }
        else{
            const filtersToApply = quickFilter.split(" ");
            const filteredData = tableContent.filter((row)=>{

                    let passesFilter = false;

                    tableHeaders.forEach((header) => {

                        const valueToCheck = row[header].toString().toLowerCase();
                        filtersToApply.forEach((filter)=>{
                            if (!(filter === "")){
                                if(valueToCheck.includes(filter.toLowerCase())){
                                    passesFilter = true;
                                }
                            }
                        })
                    });

                    return passesFilter
                }
            )

            return filteredData;
        }
    }

    const configureSort = (columnName) => {

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

    const sortByColumn = () => {

        if (!(sortColumn === "")){
            setFilteredData(sortArrayByColumn(filteredData, sortColumn, sortColumnType));
        }

        return;
    }

    useEffect(()=>{
        setFilteredData(filterData());
    },[quickFilter])

    useEffect(()=>{
        sortByColumn();
    },[sortColumn, sortColumnType])

    useEffect(()=>{
        setShowData(filteredData.slice(showPage*showRows, showRows*(showPage+1)));
    },[showPage, showRows, filteredData])


    return(
        <>
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
                    <Thead
                        tableLabels = {tableLabels}
                        tableHeaders = {tableHeaders}
                        sortColumn = {sortColumn}
                        sortColumnType = {sortColumnType}
                        configureSort={configureSort}
                    />
                    <tbody>
                        {
                            showData.length > 0
                                    ?
                            showData.map(
                                (rowData)=>(createRowCallback(rowData))
                            )
                                    :
                            <tr><td><p><i>No data to show</i></p></td></tr>
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
        </>
    );

}

Table.propTypes = {
    tableLabels : PropTypes.array.isRequired,
    tableHeaders : PropTypes.array.isRequired,
    tableContent : PropTypes.array.isRequired,
    createRowCallback : PropTypes.func.isRequired,
}
