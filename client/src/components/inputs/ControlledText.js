import React from 'react';

export default function ControlledText(props) {
  return (
    <input type='text' value={props.value} onChange={ e => props.handleChange(props.property, e)}/>
  )
}