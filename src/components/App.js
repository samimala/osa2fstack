import React from 'react';
import axios from 'axios';
import RajausFiltteri from './RajausFiltteri';
import Maa from './Maa';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
    
      nimiRajaus: ''
    }
  }
  handleNimirajausChange = (event) => {
    //console.log(event.target.value)
    this.setState({ nimiRajaus: event.target.value })
  }


  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('countries retrieved')
        this.setState({ countries: response.data })
      })
  }
  
  nameFilter = (name) => {
      return (name.toUpperCase().indexOf(this.state.nimiRajaus.toUpperCase())===0)
  }



  render() {     
    let maatFiltered = this.state.countries.filter(maa=>this.nameFilter(maa.name))
    const rajausOtsikko='Find countries: '
    //console.log(maatFiltered)
    //console.log(maatFiltered.length)

    if (maatFiltered.length>10) {
      return (
        <div>
          <RajausFiltteri 
              otsikko={rajausOtsikko}
              value={this.state.nimiRajaus}
              onChange={this.handleNimirajausChange} 
          />

          <p>Too many matches (over 10), specify another filter</p>
        </div>
      )
    }

    if (maatFiltered.length>1) {
      return (
        <div>
          <RajausFiltteri
              otsikko={rajausOtsikko}               
              value={this.state.nimiRajaus}
              onChange={this.handleNimirajausChange} 
          />

          {maatFiltered.map(maa=> 
              <Maa
                 naytaKaikki={false} 
                 nimi={maa.name} 
                 key={maa.alpha3Code} 
              />)}
        </div>
      )
    }

    if (maatFiltered.length===1) {
      return (
        <div>
          <RajausFiltteri            
              otsikko={rajausOtsikko}   
              value={this.state.nimiRajaus}
              onChange={this.handleNimirajausChange} 
          />

          {maatFiltered.map(maa=> 
               <Maa 
                  naytaKaikki={true}
                  nimi={maa.name}
                  pkaupunki={maa.capital}
                  vaesto={maa.population}
                  natiiviNimi={maa.nativeName}
                  lippuUrl={maa.flag}
                  key={maa.alpha3Code} 
               />)}
        </div>
      )
    }

    return (
      <div>
        <RajausFiltteri
            otsikko={rajausOtsikko}               
            value={this.state.nimiRajaus}
            onChange={this.handleNimirajausChange} 
        />

          <p>No matches, specify another filter</p>
        </div>
      )
  }
}

export default App
