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
    if (board[row].includes(value) != true) {
        return true;
    }
    else {
        return false;
    }
}


// Function - Checks if the current column is valid
// Returns - true if the value is not already in that column
function columnChecker(board, column, value) {
    var isValid = true;
    for (let i = 0; i < 9; i++) {
        if (board[i][column] == value) {
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
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (board[y][x] == 0) {
                return false
            }
        }
    }
    return true;
}


// x and y represent the x,y coordinates of the value (ie. x is the column, y is the row)
// v represents the value (1-9) to be evaluated
function boardSolver(board) {
    for (let x = 0; x < 9; x++) {  // Runs through the columns
        for (let y = 0; y < 9; y++) {   // Runs through the rows
            if (board[y][x] == 0) {
                for (let v = 1; v <= 9; v++) {   // Runs through the values 1-9
                    if ((columnChecker(board, x, v) == true) && (rowChecker(board, y, v) == true) && (boxChecker(board, x, y, v) == true)) {
                        board[y][x] = v;
                        if (boardSolver(board) == true) {
                            return true;
                        }
                        else {
                            board[y][x] = 0;
                        }
                    }
                }
            }
        }
    }
    return true;
}

// Main code body
getBoard();
boardSolver(inputBoard);
if (validateBoard(inputBoard) != true) {
    document.write("<h1>Invalid board - multiple solutions</h1>");
}
else {
    document.write("<table>")
    for (let y = 0; y < 9; y++) {
        document.write("<tr>")
        for (let x = 0; x < 9; x++) {
            document.write("<td>" + "<h1>" + inputBoard[y][x] + "</h1>" + "<td>")
        }
        document.write("</tr>")
    }
    document.write("</table")
}