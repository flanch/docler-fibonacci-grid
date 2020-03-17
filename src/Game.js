import React, {Component} from 'react';
import Grid from './Grid';

/*
- Game manages the color and value of each squares. 

- handleClick: It manages the mouse action and updates values and colors. 
    It also set a timeout to control back the values and colors.

- updateValues: It uptades the values for each squares in a state

- checkFibonacci: It creates an Array of objects containing each coordinates of squares that form a Fibonacci suite.

- isFibonacci: It Looks if the number n answer the Fibonacci criteria: 
    sqrt(5*n*n +/- 4) = int(5*n*n +/- 4)

- isPerfectSquare: It looks if the number n is a perfect square

- changeColors: It manages the color change of each squares when the mouse is clicked.

- returnToWhite: It manages the color change of each squares when the setTimeout is called.

- render: It passes the informations to the Grid class.
*/

class Game extends Component {
    constructor(props) {
      super(props);
      this.whitener = null;
      this.suitLength = props.suitLength;
      this.gridSize = props.gridSize;
      this.white = 'White';
      this.yellow = 'LemonChiffon';
      this.green = 'LightGreen';
      this.state = {
        squares: [
          {squares: Array(this.gridSize).fill(Array(this.gridSize).fill(null))}
        ],
        colors: [
          {colors: Array(this.gridSize).fill(Array(this.gridSize).fill(this.white))}
        ]
      };
    }
    
    handleClick = async (x, y) => {
      const newSqrs = await this.updateValues(x, y, []);
      const fiboSquares = await this.checkFibonacci(newSqrs);
      let newClrs = await this.changeColors(newSqrs, fiboSquares);

      this.setState({
        squares: [
          {
            squares : newSqrs
          }
        ],
        colors: [
          {
            colors : newClrs
          }
        ]
      });
      this.whitener = setTimeout((()=>{this.returnToWhite(newSqrs, fiboSquares)}), 500);
  
    }
  
    updateValues = (x, y, fiboSquares) => {
      const sqrs = this.state.squares[0].squares.slice();
  
      var newSqrs = [];
      for (let dx = 0; dx < this.gridSize; dx ++){
        let newRow = [];
        for (let dy = 0; dy < this.gridSize; dy++){
          let newVal = sqrs[dx][dy];
          if((dy === y || dx === x) && fiboSquares.length === 0){
            newVal += 1;
          } else if(fiboSquares.length !== 0 && fiboSquares.find(e => e.x === dx && e.y === dy)){
            newVal -= sqrs[dx][dy];
          }
  
          newRow.push(newVal);
        }
        newSqrs.push(newRow);
      }
      return newSqrs;
    }
  
    checkFibonacci = (squares) => {
      let returnArray = [];
      squares.forEach((row, index) => {
        for(let y = 0, rl = row.length - (this.suitLength - 1); y < rl; y++){
  
          let checkBool = this.suitLength;
          for(let q = 0; q < this.suitLength; q++){
            if(this.isFibonacci(row[y+q])){
              if(q > 0){
                if(row[y+q] > 1){
                  if(row[y+q] > row[y+q-1]){
                    checkBool -= 1;
                  }
                } else {
                  if(row[y+q] >= row[y+q-1] && q <= 1){
                    checkBool -= 1;
                  }
                }
              } else {
                checkBool -= 1;
              }
            }
          }
          if(checkBool === 0){
            for (let z = 0; z < this.suitLength; z++){
              let fibSuit = {x: index, y: y+z};
              returnArray.push(fibSuit);
            }
          }
        }
      })
  
      const sqrs = squares.slice(0, squares.length - (this.suitLength - 1));
      sqrs.forEach((row, index) => {
        for(let y = 0, rl = row.length; y < rl; y++){
  
          let checkBool = this.suitLength;
          for(let q = 0; q < this.suitLength; q++){
            if(this.isFibonacci(squares[index+q][y])){
              if(q > 0){
                if(squares[index+q][y] > 1){
                  if(squares[index+q][y] > squares[index+q-1][y]){
                    checkBool -= 1;
                  }
                } else {
                  if(squares[index+q][y] >= squares[index+q-1][y] && q <= 1){
                    checkBool -= 1;
                  }
                }
              } else {
                checkBool -= 1;
              }
            }
          }
          if(checkBool === 0){
            for (let z = 0; z < this.suitLength; z++){
              let fibSuit = {x: index+z, y: y};
              returnArray.push(fibSuit);
            }
          }
        }
      })
      return returnArray;
    }
  
    isFibonacci = (n) => {
      if((this.isPerfectSquare(5*n*n-4) || this.isPerfectSquare(5*n*n+4)) && n > 0){
        return true;
      }
    }
  
    isPerfectSquare = (a) => {
      var n = Math.round(Math.sqrt(a));
      return (n*n === a);
    }
  
    changeColors = (squares, fiboSquares) => {
      const sqrs = this.state.squares[0].squares.slice();
      const clrs = this.state.colors[0].colors.slice();
  
      var newClrs = []
      for (let dx = 0; dx < this.gridSize; dx ++){
        let newCRow = [];
        for (let dy = 0; dy < this.gridSize; dy++){
          let newCol = clrs[dx][dy];

          if(squares[dx][dy] !== sqrs[dx][dy]) {
            newCol = this.yellow;
          }
          if(fiboSquares.find(e => e.x === dx && e.y === dy)){
            newCol = this.green;
          } 
          newCRow.push(newCol);
        }
        newClrs.push(newCRow);
      }
  
      return newClrs;
    }
    
    returnToWhite = (squares, fiboSquares) => {
      const defSqrs = this.updateValues(-1, -1, fiboSquares);
      const colors = this.state.colors.slice();
      const currentColors = colors[colors.length - 1];
      const clrs = currentColors.colors;

      var newClrs = []
      for (let dx = 0; dx < this.gridSize; dx ++){
        let newCRow = [];
        for (let dy = 0; dy < this.gridSize; dy++){
          let newCol = clrs[dx][dy];
          if((defSqrs[dx][dy] === squares[dx][dy] && clrs[dx][dy] !== this.green) || (defSqrs[dx][dy] === 0)){
            newCol = this.white;
          }
          newCRow.push(newCol);
        }
        newClrs.push(newCRow);
      }

      this.setState({
        squares: [
          {
            squares : defSqrs
          }
        ],
        colors: [
          {
            colors : newClrs
          }
        ]
      });
    }
  
    render() {
      const squares = this.state.squares[0];
      const sqrArr = squares.squares;
      const currentC = this.state.colors[0];
      return (
        <>
          <Grid
            key={`grid1`}
            squares={sqrArr}
            colors={currentC.colors}
            onClick={(x, y) => this.handleClick(x, y)}
          />
        </>
      )
    }
  }

  export default Game