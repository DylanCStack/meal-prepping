import React from 'react';

export default function ControlledSelect(props) {
  return (
    <select value={props.selected} onChange={ e => props.handleChange(props.property, e)}>
      {props.options.map(option => { // return jsx for options array
        return <option value={option.value} key={option.value}>{option.displayName}</option>
      })}
    </select>
  )
}