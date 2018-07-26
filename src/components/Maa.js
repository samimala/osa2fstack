import React from 'react';

const Maa = (props) => {
    console.log(props.naytaKaikki)

    if (props.naytaKaikki) {
        return (
            <div>
            <div>{props.nimi} {props.natiiviNimi}</div>
            <div>capital: {props.pkaupunki}</div>
            <div>population: {props.vaesto}</div>
            <img src={props.lippuUrl} alt={'Flag of '+ props.nimi} />
            </div>
        )
    }

    return (
        <div onClick={props.onClick}>{props.nimi}</div>
    )
}

export default Maa