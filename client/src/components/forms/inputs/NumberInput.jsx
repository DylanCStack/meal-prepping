import React from 'react';

export default function NumberInput(props) {
  return (
    <input type='number' value={props.value} onChange={e => props.handleChange(props.property, e)}step={props.decimal ? '0.1' : '1'}/>
  )
}