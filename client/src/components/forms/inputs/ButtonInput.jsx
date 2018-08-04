import React from 'react';

export default function ButtonInput(props) {
  return (
    <input type="button" {...props.events} value={props.text} onClick={ (e) => {props.handleClick(e, props.value)}}/>
  )
}