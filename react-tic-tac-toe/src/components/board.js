import React from 'react';
import { Link } from 'react-router-dom';

/* storage object */
import { Storage } from './../storage/storage';

/* box component */
import { Box } from './board-box';

/* utility functions */
import * as utils from '../utils/functions';

/* Create board component */
export class Board extends React.Component {
  constructor(props) {
    super(props)

    /* initialize component state */
    this.state = {
      boxes: Array(9).fill(null),
      history: [],
      xIsNext: true
    }
  }

  /* Create instance of storage object */
  storage = new Storage();

  /* Handle click on boxes on the board */
  handleBoxClick(index) {
    /* get box state */
    const boxes = this.state.boxes.slice();

    /* get current state of history */
    let history = this.state.history;

    /* Stop game if winning condition is met */
    if (utils.findWinner(boxes) || boxes[index]) {
      return;
    }

    /* Stop game if a draw / all boxes are filled.*/
    if(utils.areAllBoxesClicked(boxes) === true) {
      return
    }

    /* Mark boxes with X or O */
    boxes[index] = this.state.xIsNext ? 'x' : 'o';

    /* Add move to history */
    history.push(this.state.xIsNext ? 'x' : 'o');

    /* Update component state */
    this.setState({
      boxes: boxes,
      history: history,
      xIsNext: !this.state.xIsNext
    })
  }

  /* Handle board restart - reset to initial state */
  handleBoardRestart = () => {
    this.setState({
      boxes: Array(9).fill(null),
      history: [],
      xIsNext: true
    })
  }

  render() {
    /* Get winner if there is one */
    const winner = utils.findWinner(this.state.boxes);

    /* Is it a Draw - all boxes checked */
    const isDraw = utils.areAllBoxesClicked(this.state.boxes)

    /* Status Messages */
    let status;

    if (winner) {
      /* Set status if winner */
      status = `The winner is: ${winner}!`;

      /* Push data about game to storage */
      this.storage.update([`${winner} won`])
    } else if (!winner && isDraw) {
      /* if draw, set status to draw */
      status = "Game is a draw!";
      /* Push data about game to storage */
      this.storage.update(['Draw Game'])
    } else {
      /* If no winner or draw, ask the next player to take their turn */

      status = `It is ${(this.state.xIsNext ? 'x' : 'o')}'s turn.`
    }

    return (
      <>
        {/* Link to scoreboard */}
        <Link to="/" className="board-link">Go back to scoreboard</Link>

        {/* The game board */}

        <div className="board-wrapper">
          <div className="board">
            <h2 className="board-heading">{status}</h2>

              <div className="board-row">
                <Box value={this.state.boxes[0]} onClick={() => this.handleBoxClick(0)} />

                <Box value={this.state.boxes[1]} onClick={() => this.handleBoxClick(1)} />

                <Box value={this.state.boxes[2]} onClick={() => this.handleBoxClick(2)} />
              </div>

              <div className="board-row">
                <Box value={this.state.boxes[3]} onClick={() => this.handleBoxClick(3)} />

                <Box value={this.state.boxes[4]} onClick={() => this.handleBoxClick(4)} />

                <Box value={this.state.boxes[5]} onClick={() => this.handleBoxClick(5)} />
              </div>

              <div className="board-row">
                <Box value={this.state.boxes[6]} onClick={() => this.handleBoxClick(6)} />

                <Box value={this.state.boxes[7]} onClick={() => this.handleBoxClick(7)} />

                <Box value={this.state.boxes[8]} onClick={() => this.handleBoxClick(8)} />
              </div>
          </div>        

          <div className="board-history">
            <h2 className="board-heading">Moves history:</h2>

            {/* List with history of moves */}
            <ul className="board-historyList">
              {this.state.history.length !== 0 && this.state.history.map((move,index) => {
                return <li key={index}>Move {index +1}: <strong>{move}</strong></li>
              })}
            </ul>
          </div>

          {/* Button to start new game */}
          {winner && <div className="board-footer">
            <button className="btn" onClick={this.handleBoardRestart}>Start new game</button>
            </div>}
        </div>
        </>
    )
  }
}