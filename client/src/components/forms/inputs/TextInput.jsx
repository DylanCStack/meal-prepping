import React from 'react';

export default function TextInput(props) {
  return (
    <input type='text' value={props.value} onChange={ e => props.handleChange(props.property, e)}/>
  )
}