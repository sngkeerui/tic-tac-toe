// gameboard IIFE to handle board state
const gameboard = (() => {

	// represent gameboard in the form of an array 
	let board = ['','','','','','','','',''];

	// create method to place marker on gameboard
	const placeMarker = (marker, position) => {

		// place marker only if position selected is empty
		if (board[position] === '') {
		    board[position] = marker;
			return true;
		} else {
			return false;
		}
	}

    // create method to get current board state
	const getBoard = () => board;

    // create method to reset board state
	const resetBoard = () => {
	board = ['','','','','','','','',''];
	}

    // return methods
	return { placeMarker, getBoard, resetBoard };
})()

// gameController IIFE to handle gameplay
const gameController = (() => {
    
    /* boilerplate pattern for turn-based logic */
    
    // store players as objects
    const player1 = {name: 'Player X', marker: 'X'};
    const player2 = {name: 'Player O', marker: 'O'};

    // reference starting active player
    let activePlayer = player1;

    // switch active player 
	const switchPlayer = () => activePlayer = activePlayer === player1 ? player2 : player1;

	// create method to get current active player
	const getActivePlayer = () => activePlayer;

	const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

	let isGameOver = false;

	const checkWin = () => {
		const currentBoard = gameboard.getBoard();
		return winConditions.some(conditions => { 
			return conditions.every(i => currentBoard[i] === activePlayer.marker);
		})
	}

	const checkDraw = () => {
		const currentBoard = gameboard.getBoard();
		return (!currentBoard.includes(""));
	}

	const playRound = (position) => {

		// stop playing round if game is over
		if (isGameOver) return;

		const moveValid = gameboard.placeMarker(activePlayer.marker, position);
	
		if (moveValid) {
			if (checkWin()) {
				isGameOver = true;
				return "win"; 
			} else if (checkDraw()) {
				isGameOver = true;
				return "draw";
			} else {switchPlayer();}
		}
	}

	const resetGame = () => {
		isGameOver = false;
		activePlayer = player1;
	}

	const getIsGameOver = () => isGameOver;

	return { getActivePlayer, playRound , resetGame, getIsGameOver };
})()

// displayController IIFE to handle 
const displayController = (() => {

	const board = document.getElementById('gameboard-ui');

	const renderBoard = () => {

		// clear the board
		board.innerHTML = '';

		const currentBoard = gameboard.getBoard();

		// loop through the array to create grid squares
		currentBoard.forEach((marker, index) => { 

			const square = document.createElement('div');

			square.classList.add('square'); 

			// store the array index directly on the element
			square.dataset.index = index;

			// display 'X', 'O' or empty string
			square.textContent = marker;

			square.addEventListener('click', squareClick);

			// append new square to grid container
			board.appendChild(square);
		})
	}

	
	const status = document.getElementById('status-message');

	const updateStatus = (outcome) => {
		if (outcome === "win") {
			const activePlayer = gameController.getActivePlayer();
			status.textContent = `${activePlayer.name} won!`	
		} 
		else if (outcome === "draw") {status.textContent = 'Draw!';} 
		else {

			// stop updating status if game is over
			if (gameController.getIsGameOver()) return;

			const activePlayer = gameController.getActivePlayer();
			status.textContent = `It's ${activePlayer.name}'s turn.`;
			}
	}
	

	const squareClick = (e) => {

		// retrieve the index from specific square clicked
		const i = parseInt(e.target.dataset.index);

		// pass the index as argument to play a round
		const outcome = gameController.playRound(i);

		// redraw the board to include new marker
		renderBoard();
		
		updateStatus(outcome);
	}

	const resetBtn = document.getElementById('reset-btn');

	const clearBoard = () => {

	gameboard.resetBoard();

	gameController.resetGame();

	renderBoard();

	// Reset the status message
	updateStatus();
	}

	resetBtn.addEventListener('click', clearBoard);

	return { renderBoard };
})()

// render board on browser load
displayController.renderBoard();