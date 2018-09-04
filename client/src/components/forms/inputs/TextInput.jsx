import React from 'react';

export default function TextInput(props) {
  return (
    <input type='text' {...props.events} value={props.value} onChange={ e => props.handleChange(e.target.value, props.property, props.index)}/>
  )
}