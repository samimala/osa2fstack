import React from 'react';
import Henkilo from './Henkilo';

const Henkilot = (props) => {
    //console.log(props)
    //console.log(props.persons.map(x=>(x.name)))
    return (
    <table>
    <tbody>     
    { props.persons.map(
            person=><Henkilo name={person.name} number={person.number} key={person.name} /> 
      )} 
    </tbody>
    </table>
    )
}

export default Henkilot