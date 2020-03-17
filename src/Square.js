import React from 'react';

//This is the function displaying a single square. All the logic is in Game.js

const Square = (props) => {
    return (
      <button className="square" onClick={props.onClick} style={{border:'1px solid black', width:24, height: 24, fontSize: 12, backgroundColor: props.color}}>
        {props.value ? props.value : 0}
      </button>
    );
  }

  export default Square;