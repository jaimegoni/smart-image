
import "./TableComponents.css"

export const Td = ({children})=>{

    return(
        <td
            className="table__td"
        >
            {children}
        </td>
    )
}