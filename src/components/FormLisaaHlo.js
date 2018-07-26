import React from 'react';

// Alun perin nimesin tämän FormLisaaUusiHenkilo, mutta
// joku ei hyväksy niin pitkää nimeä. Alkoi toimia
// kun lyhensin näin. Mistä pituusrajoitus tulee

const FormLisaaHlo = (props) => {
    
    return (
      <div>
        <h2>Lisää uusi</h2>

        <form onSubmit={props.addPerson}>
          <div>
            nimi: 
            <input 
              value={props.uusiNimi}
              onChange={props.handleNameChange} 
            />
          </div>
          <div>
            numero: 
            <input 
              value={props.uusiNumero}
              onChange={props.handleNumberChange} 
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      </div>
    )
}

export default FormLisaaHlo