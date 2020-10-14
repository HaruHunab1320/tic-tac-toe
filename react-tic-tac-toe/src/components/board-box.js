import React from 'react';

/* Create the box component */
export const Box = (props) => {
  return (
    <button className="board__box" onClick={props.onClick}>
      {props.values}
    </button>
  )
}