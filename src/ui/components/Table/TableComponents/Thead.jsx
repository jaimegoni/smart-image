
import PropTypes from 'prop-types'

import './TableComponents.css';

export const Thead = ({tableLabels, tableHeaders, sortColumn, sortColumnType, configureSort})=>{
    
    if(!(tableHeaders.length === tableLabels.length)){
        throw new Error("Error at Table/Thead: tableHeaders does not have the same length as tableLabels");
    }

    const getLabelFromHeader = (header)=>{
        return tableLabels[tableHeaders.indexOf(header)];
    }

    return(
        <thead className="sticky__thead">
            <tr key="HeaderRow" className="head__tr">
                {
                    tableHeaders.map(
                        (colHeader)=>(
                            <th
                                key={colHeader}
                                onClick={()=>{configureSort(colHeader)}}
                            >
                                {   
                                    colHeader === sortColumn
                                            ?
                                    sortColumnType === "ascending"
                                            ?
                                    "🔺" + getLabelFromHeader(colHeader)
                                            :
                                    "🔻" + getLabelFromHeader(colHeader)
                                            :
                                    getLabelFromHeader(colHeader)
                                }
                            </th>
                            )
                    )
                }
            </tr>
        </thead>
    );
}

Thead.propTypes = {
    tableLabels: PropTypes.array.isRequired,
    tableHeaders: PropTypes.array.isRequired,
    sortColumn: PropTypes.string.isRequired,
    sortColumnType: PropTypes.string.isRequired,
    configureSort: PropTypes.func.isRequired
}