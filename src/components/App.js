import React from 'react';
import personService from '../services/persons.js';
import Henkilot from './Henkilot';
import RajausFiltteri from './RajausFiltteri';
import FormLisaaHlo from './FormLisaaHlo';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      uusiNimi: '',
      uusiNumero: '',

      nimiRajaus: ''
    }
  }

  handleNameChange = (event) => {
    //console.log(event.target.value)
    this.setState({ uusiNimi: event.target.value })
  }

  handleNimirajausChange = (event) => {
    //console.log(event.target.value)
    this.setState({ nimiRajaus: event.target.value })
  }

  handleNumberChange = (event) => {
    //console.log(event.target.value)
    this.setState({ uusiNumero: event.target.value })
  }

  personExists = (newperson) => {
    return this.state.persons.find(person=>(person.name===newperson.name))
  }

  componentDidMount() {
    //console.log('did mount')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: this.state.uusiNimi,
        number: this.state.uusiNumero
    }   

    if (this.personExists(personObject)) {
        alert('On jo')
        this.setState({uusiNimi:'', uusiNumero:''})
        return;
    }


    personService
      .create(personObject)
      .then(response => {
        console.log(response)
        this.setState({ 
          persons: this.state.persons.concat(response.data),
          uusiNimi:'', 
          uusiNumero:'' 
        })
      })
  }
  
  
  removePerson = (name) => () => {
    console.log('poistetaan ', name)
    
    if (!window.confirm('Poistetaanko ' + name + '?')) return

    const id = this.state.persons.find(person=>person.name===name).id
    console.log('eli ', id)
    personService
      .remove(id)
      .then(
        res=>{
          console.log(res)
        }
      )

      this.setState({persons: this.state.persons.filter(person=>person.name!==name)})
    }

  nameFilter = (name) => {
      return (name.toUpperCase().indexOf(this.state.nimiRajaus.toUpperCase())===0)
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>

        <RajausFiltteri               
            value={this.state.nimRajaus}
            onChange={this.handleNimirajausChange} 
        />

        <FormLisaaHlo
            uusiNimi={this.state.uusiNimi}
            handleNameChange={this.handleNameChange}
            uusiNumero={this.state.uusiNumero}
            handleNumberChange={this.handleNumberChange}
            addPerson={this.addPerson}
        />

        <h2>Numerot</h2>    
        <Henkilot 
            persons={this.state.persons.filter(person=>this.nameFilter(person.name))}
            poista = {this.removePerson}
        />
      </div>
    )
  }
}

export default App
