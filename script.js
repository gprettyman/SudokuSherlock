// Creates a blank array for the user-inputted board, fills with 0
const inputBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

// Gets user input and fills in inputBoard
function getBoard() {
    for (let row = 0; row < 9; row++) {
        let inputRowNumbers = prompt("Please type the numbers across row #" + (row+1) + ". For blanks, please type 0");
        for (let num = 0; num < 9; num++){  
            inputBoard[row][num] = inputRowNumbers.charAt(num);
        }
    }
}


// Function - Checks if the current row is valid
// Returns - true if the value is not already in that row
function rowChecker(board, row, value) {
    var isValid = true;
    for (let c = 0; c < 9; c++) {
        if (board[row][c] == value) {
            isValid = false;
        }
    }
    return isValid;
}


// Function - Checks if the current column is valid
// Returns - true if the value is not already in that column
function columnChecker(board, column, value) {
    var isValid = true;
    for (let r = 0; r < 9; r++) {
        if (board[r][column] == value) {
            isValid = false;
        }
    }
    return isValid;
}


// Function - Checks if the current small box is valid
// Returns - true if the value is not already in that column
function boxChecker(board, column, row, value) {
    var isValid = true;
    let boxRowStart = 0;
    let boxColumnStart = 0;
    row++;
    column++;
    if ((row / 3) <= 1) {
        boxRowStart = 0;
    }
    else if (((row / 3) > 1) && ((row / 3) <= 2)) {
        boxRowStart = 3;
    }
    else {
        boxRowStart = 6;
    }
    if ((column / 3) <= 1) {
        boxColumnStart = 0;
    }
    else if (((column / 3) > 1) && ((column / 3) <= 2)) {
        boxColumnStart = 3;
    }
    else {
        boxColumnStart = 6;
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[(boxRowStart + i)][(boxColumnStart + j)] == value)
                isValid = false;
        }
    }
    return isValid;
}

function validateBoard(board) {
    for (let c = 0; c < 9; c++) {
        for (let r = 0; r < 9; r++) {
            if (board[r][c] == 0) {
                return false
            }
        }
    }
    return true;
}


// c and r represent the column and row "coordinates" of the square
// v represents the value (1-9) to be evaluated
function boardSolver(board) {
    for (let c = 0; c < 9; c++) {  // Runs through the columns
        for (let r = 0; r < 9; r++) {   // Runs through the rows
            if (board[r][c] == 0) {
                for (let v = 1; v <= 9; v++) {   // Runs through the values 1-9
                    if (columnChecker(board, c, v) != true || rowChecker(board, r, v) != true || boxChecker(board, c, r, v) != true) {
                        ; // Does nothing and moves on to next value if any of the checks are false
                    }
                    else{
                        board[r][c] = v;
                        if (boardSolver(board) == true) {
                            return true;
                        }
                        else {
                            board[r][c] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Main code body
getBoard();
boardSolver(inputBoard);
document.write("<table>")
for (let r = 0; r < 9; r++) {
    document.write("<tr>")
    for (let c = 0; c < 9; c++) {
        document.write("<td>" + "<h1>" + inputBoard[r][c] + "</h1>" + "<td>")
    }
    document.write("</tr>")
}
document.write("</table")
