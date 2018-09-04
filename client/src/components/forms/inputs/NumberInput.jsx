import React from 'react';

export default function NumberInput(props) {
  return (
    <input type='number' value={props.value} onChange={e => props.handleChange(e.target.value, props.property)}step={props.step}/>
  )
}