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


const App = () => {
    const kurssit = [
        {
          nimi: 'Half Stack -sovelluskehitys',
          id: 1,
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
        },
        {
          nimi: 'Node.js',
          id: 2,
          osat: [
            {
              nimi: 'Routing',
              tehtavia: 3,
              id: 1
            },
            {
              nimi: 'Middlewaret',
              tehtavia: 7,
              id: 2
            }
          ]
        }
    ]
      
    return (
      <div>
       {kurssit.map(kurssi=><Kurssi kurssi={kurssi} key={kurssi.id} />) }
      </div>
    )
}
  
ReactDOM.render(
    <App />, 
    document.getElementById('root')
);
