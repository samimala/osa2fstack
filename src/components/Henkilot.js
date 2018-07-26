import React from 'react';
import Henkilo from './Henkilo';

const Henkilot = (props) => {
    //console.log(props)
    //console.log(props.persons.map(x=>(x.name)))
    return (
    props.persons.map(x=><Henkilo person={x.name} key={x.name} /> )
    )
}

export default Henkilot