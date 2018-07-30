import React from 'react'

const Henkilo = (props) => {
    return (
        <tr>
        <td>{props.name}</td>
        <td>{props.number}</td>
        <td><button onClick={props.poista}>poista</button></td>
        </tr>
    )
}

export default Henkilo