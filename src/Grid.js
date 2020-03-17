import Square from './Square';
import React, {Component} from 'react';

//This is the function creating the grid row by row. All the logic is in Game.js

class Grid extends Component {
    renderSquare(x, y) {
      return (
        <Square
          key={`x${x}y${y}`}
          value={this.props.squares[x][y]}
          color={this.props.colors[x][y]}
          onClick={() => this.props.onClick(x, y)}
        />
      );
    }
  
    render() {
      const sqrArray = this.props.squares;
      const allTheSquares = sqrArray.map((row, rowIndex) =>
      <div className="row" key={`x${rowIndex}`}>
      {row.map((sqr, index) => (
        this.renderSquare(rowIndex, index)))}
    </div>
      );
  
      return (
        <>
          {allTheSquares}          
        </>
      );
    }
  }

  export default Grid;