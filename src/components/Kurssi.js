import React from 'react';

const Kurssi = (props) => {
    return (
        <div>
           <Otsikko nimi = {props.kurssi.nimi} />
           <Sisalto kurssi = {props.kurssi} />
        </div>
    )
}

const Otsikko = (props) => {
    return <h1>{props.nimi}</h1>    
}

const Sisalto = (props) => {
    //console.log(props.kurssi.osat.reduce((x,y )=>x+=y.tehtavia,0))
    return (
        <div>
        {props.kurssi.osat.map(
            osa => <Osa osanimi={osa.nimi} tehtavat={osa.tehtavia} key={osa.id} /> )}
        <p>yhteensä {props.kurssi.osat.reduce((x,y)=>x+=y.tehtavia,0)} tehtävää</p>   
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osanimi} {props.tehtavat}</p>
    ) 
}

export default Kurssi