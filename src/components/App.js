import React from 'react';
import Henkilot from './Henkilot';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-12345' },
        { name: 'Esko Ukkonen', number: '09-546272' }
      ],
      uusiNimi: '',
      uusiNumero: ''
    }
  }

  handleNameChange = (event) => {
    //console.log(event.target.value)
    this.setState({ uusiNimi: event.target.value })
  }

  handleNumberChange = (event) => {
    //console.log(event.target.value)
    this.setState({ uusiNumero: event.target.value })
  }

  personExists = (newperson) => {
    return this.state.persons.find(person=>(person.name===newperson.name))
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
  
  
  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: 
            <input 
              value={this.state.uusiNimi}
              onChange={this.handleNameChange} 
            />
          </div>
          <div>
            numero: 
            <input 
              value={this.state.uusiNumero}
              onChange={this.handleNumberChange} 
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>    
        <Henkilot persons={this.state.persons} />
      </div>
    )
  }
}

export default App
