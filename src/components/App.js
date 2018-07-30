import React from 'react';
import personService from '../services/persons.js';
import Henkilot from './Henkilot';
import RajausFiltteri from './RajausFiltteri';
import FormLisaaHlo from './FormLisaaHlo';
import Notification from './Notification';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      uusiNimi: '',
      uusiNumero: '',

      nimiRajaus: '',
      noteText: null
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

  clearNoteAfter = (time) => {
    //console.log('Clearing note after ' + time)
    setTimeout(() => {
      //console.log('Putsaus ', this)
      this.setState({noteText: null})}, time);
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
    const newPerson = {
        name: this.state.uusiNimi,
        number: this.state.uusiNumero
    }   

    const oldPerson = this.state.persons.find(person=>(person.name===newPerson.name))
    if (oldPerson){
      if (!window.confirm(oldPerson.name + ' on jo luettelossa,\nkorvataanko vanha numero uudella?') ) {
        this.setState({
          uusiNimi:'', 
          uusiNumero:''
        })
        return
      }
      newPerson.id = oldPerson.id;
      personService
        .update(newPerson.id, newPerson)
        .then(res=>console.log(res))
        this.setState({
          persons: this.state.persons.map(person=>(person.name===newPerson.name)?newPerson:person),
          uusiNimi:'', 
          uusiNumero:'',
          noteText: 'Numero vaihdettu henkilölle ' + newPerson.name
        })
        this.clearNoteAfter(4000)
        return;
    }


    personService
      .create(newPerson)
      .then(response => {
        console.log(response)
        this.setState({ 
          persons: this.state.persons.concat(response.data),
          uusiNimi:'', 
          uusiNumero:'', 
          noteText: 'Lisätty uusi henkilö ' + newPerson.name
        })
        this.clearNoteAfter(4000)
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
          this.setState({
            persons: this.state.persons.filter(person=>person.name!==name),
            noteText: "Poistettiin henkilö " + name
          })
          this.clearNoteAfter(4000);
        }
      )
    }

  nameFilter = (name) => {
      return (name.toUpperCase().indexOf(this.state.nimiRajaus.toUpperCase())===0)
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>

        <Notification message={this.state.noteText} />

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
