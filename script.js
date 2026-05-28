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

	const checkWin = () => {
		const board = gameboard.getBoard();
		return winConditions.some(conditions => {
			return conditions.every(i => board[i] === activePlayer.marker);
		})
	}

	const playRound = (position) => {

		const moveValid = gameboard.placeMarker(activePlayer.marker, position);
		
		if (moveValid) {
			if (checkWin()) {
				console.log(`${activePlayer.name} wins!`);
			} else {switchPlayer();}
		} else { 
			console.log("Try picking a different square.");
		}
	}

	return { getActivePlayer, playRound };
})()