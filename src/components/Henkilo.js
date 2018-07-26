import React from 'react'

const Henkilo = (props) => {
    return (
        <tr>
        <td>{props.name}</td>
        <td>{props.number}</td>
        </tr>
    )
}

export default Henkilo