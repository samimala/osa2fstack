import React from 'react';

const RajausFiltteri = (props) => {
    return (
        <div>
            {props.otsikko} 
            <input 
              value={props.value}
              onChange={props.onChange} 
            />
        </div>
    )
}

export default RajausFiltteri
