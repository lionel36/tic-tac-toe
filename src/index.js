import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BOARD_SIZE = 3;

function Square(props) {
    const isFinalPlay =
        props.finalPlay != null && props.finalPlay.selectedCol === props.col && props.finalPlay.selectedRow === props.row;
    return (
        <button className={isFinalPlay ? "square finalPlay" : "square"} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                col={i % BOARD_SIZE + 1}
                row={Math.floor(i / BOARD_SIZE) + 1}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                finalPlay={this.props.finalPlay}
            />
        );
    }

    render() {
        const squares = Array(BOARD_SIZE).fill(0).map((eachValue, index) => {
            const subSquares = Array(BOARD_SIZE).fill(0).map((eachSubValue, subIndex) => {
                return this.renderSquare(index * BOARD_SIZE + subIndex);
            });
            return (
                <div key={index} className="board-row">
                    {subSquares}
                </div>
            );
        });
        return (
            <div>
                {squares}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(BOARD_SIZE*BOARD_SIZE).fill(null),
                selectedCol: null,
                selectedRow: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            historyIsAsc: true,
        };
    }

    static getNextPlayer(xIsNext) {
        return xIsNext ? 'X' : 'O';
    }

    calculateWinner(squares) {
        const horizontalLines = Array(BOARD_SIZE).fill(0).map((eachValue, index) => {
            return Array(BOARD_SIZE).fill(0).map((eachSubValue, subIndex) => {
                return index * BOARD_SIZE + subIndex;
            });
        });
        const verticalLines = Array(BOARD_SIZE).fill(0).map((eachValue, index) => {
            return Array(BOARD_SIZE).fill(0).map((eachSubValue, subIndex) => {
                return index + (subIndex * BOARD_SIZE);
            });
        });
        const crossLines = Array(2).fill(0).map((eachValue, index) => {
            return Array(BOARD_SIZE).fill(0).map((eachSubValue, subIndex) => {
                return index * (BOARD_SIZE - 1) + (BOARD_SIZE + (-2 * index + 1)) * subIndex;
            });
        });
        const lines = [...horizontalLines, ...verticalLines, ...crossLines];
        let judge = null;
        lines.forEach(eachLine => {
            const cellIsFilled = squares[eachLine[0]] != null;
            const targetCell = squares[eachLine[0]];
            const filteredLines = eachLine.filter(eachCell => squares[eachCell] !== targetCell);
            const allCellIsSame = filteredLines.length === 0;
            if (cellIsFilled && allCellIsSame) {
                judge = squares[eachLine[0]];
            }
        });
        if (judge == null && squares.every(eachValue => eachValue != null)) {
            return 'draw';
        }
        return judge;
    }

    getAvoidNumber(squares, clickableSquares) {
        const horizontalLines = Array(BOARD_SIZE).fill(0).map((eachValue, index) => {
            return Array(BOARD_SIZE).fill(0).map((eachSubValue, subIndex) => {
                return index * BOARD_SIZE + subIndex;
            });
        });
        const verticalLines = Array(BOARD_SIZE).fill(0).map((eachValue, index) => {
            return Array(BOARD_SIZE).fill(0).map((eachSubValue, subIndex) => {
                return index + (subIndex * BOARD_SIZE);
            });
        });
        const crossLines = Array(2).fill(0).map((eachValue, index) => {
            return Array(BOARD_SIZE).fill(0).map((eachSubValue, subIndex) => {
                return index * (BOARD_SIZE - 1) + (BOARD_SIZE + (-2 * index + 1)) * subIndex;
            });
        });
        const lines = [...horizontalLines, ...verticalLines, ...crossLines];
        let judge = null;
        lines.forEach(eachLine => {
            let targetCell = null;
            eachLine.forEach(eachCell => {
                if (squares[eachCell] != null) {
                    targetCell = squares[eachCell];
                }
            });
            if (targetCell != null) {
                const filteredLines = eachLine.filter(eachCell => squares[eachCell] !== targetCell);
                if (filteredLines.length === 1) {
                    if (clickableSquares.includes(filteredLines[0])) {
                        judge = filteredLines[0];
                    }
                }
            }
        });
        return judge;
    }

    computedPlay() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares)) {
            return;
        }
        const clickableSquares = squares.map((square, index) => !square ? index : null).filter(square => square);
        const avoidClickNumber = this.getAvoidNumber(squares, clickableSquares);
        const clickNumber =
            avoidClickNumber != null ?
                avoidClickNumber : clickableSquares[Math.floor(Math.random() * clickableSquares.length)];

        squares[clickNumber] = Game.getNextPlayer(this.state.xIsNext);
        this.setState({
            history: history.concat([{
                squares: squares,
                selectedCol: clickNumber % BOARD_SIZE + 1,
                selectedRow: Math.floor(clickNumber / BOARD_SIZE) + 1,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = Game.getNextPlayer(this.state.xIsNext);
        this.setState({
            history: history.concat([{
                squares: squares,
                selectedCol: i % BOARD_SIZE + 1,
                selectedRow: Math.floor(i / BOARD_SIZE) + 1,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
        setTimeout(() => {
            if (!this.state.xIsNext) {
                this.computedPlay();
            }
        }, 1000);
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    toggleHistory() {
        this.setState({
            historyIsAsc: !this.state.historyIsAsc,
        });
    }

    resetGame() {
        this.setState({
            history: [{
                squares: Array(BOARD_SIZE*BOARD_SIZE).fill(null),
                selectedCol: null,
                selectedRow: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            historyIsAsc: true,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const { selectedCol, selectedRow } = step;
            const desc =
                move > 0 ?
                    `Go to move # ${move} (${selectedCol}, ${selectedRow}, ${Game.getNextPlayer((move % 2) !== 0)})` :
                    'Go to game start';
            return (
                <li key={move}>
                    <button
                        className={this.state.stepNumber === move ? 'currentHistory' : ''}
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        const sortedMoves = this.state.historyIsAsc ? moves : moves.reverse();

        let finalPlay = null;
        let status = '';
        if (winner == null) {
            status = `Next player: ${Game.getNextPlayer(this.state.xIsNext)}`;
        } else if (winner === 'draw') {
            status = 'draw';
        } else {
            status = `Winner: ${winner}`;
            finalPlay = current;
        }

        return (
            <div className="main-board">
                <div className="button-wrapper">
                    <button className="button" onClick={() => this.resetGame()}>リセット</button>
                    <button className="button" onClick={() => this.toggleHistory()}>
                        履歴をソート
                    </button>
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                            finalPlay={finalPlay}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{sortedMoves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

