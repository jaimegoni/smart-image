

import "./TableComponents.css"

export const Tr = ({children})=>{

    return(
        <tr
            className="table__tr"
        >
            {children}
        </tr>
    )
}