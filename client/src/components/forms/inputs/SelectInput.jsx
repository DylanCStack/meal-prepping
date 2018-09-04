import React from 'react';

export default function SelectInput(props) {
  return (
    <select value={props.selected} onChange={ e => props.handleChange(e.target.value, props.property)}>
      {props.options.map(option => { // return jsx for options array
        return <option value={option.value} key={option.value}>{option.displayName}</option>
      })}
    </select>
  )
}