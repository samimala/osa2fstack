import React from 'react';
import ReactDOM from 'react-dom';

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
    return (
        <div>
        {props.kurssi.osat.map(
            osa => <Osa osanimi={osa.nimi} tehtavat={osa.tehtavia} key={osa.id} /> )}   
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osanimi} {props.tehtavat}</p>
    ) 
}


const App = () => {
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
            id: 1
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7,
            id: 2
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14,
            id: 3
          }
      ]
    }
  
    return (
      <div>
        <Kurssi kurssi={kurssi} />
      </div>
    )
  }
  
ReactDOM.render(
    <App />, 
    document.getElementById('root')
);
