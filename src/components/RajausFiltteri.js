import React from 'react';

const RajausFiltteri = (props) => {
    return (
        <div>
            rajaa näytettäviä: 
            <input 
              value={props.value}
              onChange={props.onChange} 
            />
        </div>
    )
}

export default RajausFiltteri
