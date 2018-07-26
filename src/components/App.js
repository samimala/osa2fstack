import React from 'react';
import Henkilot from './Henkilot';
import RajausFiltteri from './RajausFiltteri';
import FormLisaaHlo from './FormLisaaHlo';
import axios from 'axios';

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
    console.log('did mount')
    axios
      .get('http://localhost:3001/persons')
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

    const persons = this.state.persons.concat(personObject)

    this.setState({
        persons,
        uusiNimi: '',
        uusiNumero:''
    })
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
        <Henkilot persons={this.state.persons.filter(person=>this.nameFilter(person.name))} />
      </div>
    )
  }
}

export default App
