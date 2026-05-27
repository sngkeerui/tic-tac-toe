// gameboard IIFE to handle board state
const gameboard = (() => {

	// represent gameboard in the form of an array 
	let board = ['','','','','','','','',''];

	// create method to place marker on gameboard
	const placeMarker = (marker, position) => {

		// place marker only if position selected is empty
		if (board[position] === '') {
		    board[position] = marker;
		} else {
			console.log("Spot already taken!");
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