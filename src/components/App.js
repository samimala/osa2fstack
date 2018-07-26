import React from 'react';
import Henkilot from './Henkilot';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' },
        { name: 'Esko Ukkonen' }
      ],
      newName: ''
    }
  }

  handlePersonChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  personExists = (newperson) => {
    return this.state.persons.find(person=>(person.name===newperson.name))
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: this.state.newName
    }   

    if (this.personExists(personObject)) {
        alert('On jo')
        this.setState({newName:''})
        return;
    }

    const persons = this.state.persons.concat(personObject)

    this.setState({
        persons,
        newName: ''
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
              value={this.state.newName}
              onChange={this.handlePersonChange} 
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Henkilot</h2>    
        <Henkilot persons={this.state.persons} />
      </div>
    )
  }
}

export default App
